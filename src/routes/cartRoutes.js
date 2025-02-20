const express = require("express");
const {
  addToCart,
  getCartItems,
  removeCartItem,
  updateQuantity,
  updateCart,
} = require("../controllers/cartController.js");
const { verifyToken } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/add", verifyToken, addToCart);
router.get("/", verifyToken, getCartItems);
router.patch("/update-quantity/:id", verifyToken, updateQuantity);
router.patch("/update-cart", verifyToken, updateCart);
router.delete("/remove/:productId", verifyToken, removeCartItem);

module.exports = router;
