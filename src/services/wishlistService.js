const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");

const addToWishlist = async (userId, productId) => {
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          products: productId,
        },
      },
      { new: true, upsert: true }
    );
    return wishlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getWishlistItems = async (user) => {
  try {
    const wishlist = await Wishlist.findOne({ user: user.id }).populate(
      "products.product"
    );
    return wishlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeWishlistItem = async (user, productId) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: user.id },
      { $pull: { products: productId } },
      { new: true }
    );
    return wishlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { addToWishlist, getWishlistItems, removeWishlistItem };
