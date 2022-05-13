const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");
const { validateInput } = require("../middleware/validate-input");
const { createProduct } = require("../controllers/productController");
const { productList,listByCategory } = require("../controllers/productController");

router.post(
  "/creat",
  [
    check("category_id", "Category is required").not().isEmpty(),
    check("product_name", "Product Name is required").not().isEmpty(),
    check("pieces_per_outer", "Pieces Per Outer is required").not().isEmpty(),
    check("mrp_per_outer", "MRP Per Outer is required").not().isEmpty(),
    check("mrp_per_pieces", "MRP Per Pieces is required").not().isEmpty(),
    check("display_order", "Display Order is required").not().isEmpty(),
    check("sale_type", "Sale Type is required").not().isEmpty(),
    check("visibility", "visibility is required").not().isEmpty(),
    validateInput,
  ],
  createProduct
);

router.get("/list",productList);
router.get("/listByCategory",listByCategory);

module.exports = router;