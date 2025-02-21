const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");

const addToWishlist = async (userId, productId) => {
  console.log("checking",userId, productId)
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    let wishlist = await Wishlist.findOne({ user: userId });
    
    if (wishlist && wishlist.products.includes(productId)) {
      throw new Error("Already in wishlist");
    }

    wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $push: { products: productId } },
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
      "products"
    );
    return wishlist;
  } catch (error) {
    console.log(error);
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
    const updatedWishlist = await Wishlist.findOne({ user: user.id }).populate(
      "products"
    );
    return updatedWishlist;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { addToWishlist, getWishlistItems, removeWishlistItem };
