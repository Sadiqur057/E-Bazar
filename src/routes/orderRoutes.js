const express = require("express");

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../controllers/orderController.js");

const { verifyToken, authorizeAdmin } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/add", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.get("/all", verifyToken, authorizeAdmin, getAllOrders);
router.patch("/update-status/:id", verifyToken, updateOrderStatus);

module.exports = router;
