const { Router } = require("express");
const router = Router();

const { check } = require("express-validator");
const { validateInput } = require("../middleware/validate-input");
const { createOrder, orderList, orderData } = require("../controllers/orderController");

router.post(
  "/create",
  createOrder
);

router.get("/list/:id",orderList);
router.get("/get/:id",orderData);

module.exports = router;