const wishlistService = require("../services/wishlistService");
const addToWishlist = async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.body;
    const wishlist = await wishlistService.addToWishlist(user.id, productId);
    res.status(200).send({ success: true, data: wishlist, message: "Product added to wishlist" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getWishlistItems = async (req, res) => {
  try {
    const wishlist = await wishlistService.getWishlistItems(req.user);
    res.status(200).send({ success: true, data: wishlist });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const removeWishlistItem = async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.params;
    const wishlist = await wishlistService.removeWishlistItem(user, productId);
    res.status(200).send({ success: true, data: wishlist });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = { addToWishlist, getWishlistItems, removeWishlistItem };
