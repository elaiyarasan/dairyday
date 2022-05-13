const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");
const { validateInput } = require("../middleware/validate-input");
const { createCategory } = require("../controllers/categoryController");
const { categoryList } = require("../controllers/categoryController");

router.post(
  "/creat",
  [
    check("category_name", "Category Name is required").not().isEmpty(),
    check("quantity", "Quantity is required").not().isEmpty(),
    check("visibility", "visibility is required").not().isEmpty(),
    validateInput,
  ],
  createCategory
);

router.get("/list",categoryList);

module.exports = router;