const express = require("express");

const {
  addToWishlist,
  getWishlistItems,
  removeWishlistItem,
} = require("../controllers/wishlistController.js");

const { verifyToken } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/add", verifyToken, addToWishlist);
router.get("/", verifyToken, getWishlistItems);
router.delete("/remove/:productId", verifyToken, removeWishlistItem);

module.exports = router;