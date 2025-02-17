const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (userId, productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");
    const cart = await Cart.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          products: {
            product: productId,
            quantity,
          },
        },
      },
      { new: true, upsert: true }
    );
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getCartItems = async (user) => {
  try {
    const cart = await Cart.findOne({ user: user.id }).populate(
      "products.product"
    );
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const removeCartItem = async (user, productId) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: user.id },
      { $pull: { products: { product: productId } } },
      { new: true }
    );
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { addToCart, getCartItems, removeCartItem };
