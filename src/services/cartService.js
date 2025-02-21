const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (userId, productId, quantity) => {
  try {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    let cart = await Cart.findOneAndUpdate(
      { user: userId, "products.product": productId },
      { $inc: { "products.$.quantity": quantity } },
      { new: true }
    );

    if (!cart) {
      cart = await Cart.findOneAndUpdate(
        { user: userId },
        { $push: { products: { product: productId, quantity } } },
        { new: true, upsert: true }
      );
    }

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCart = async (userId, cartItems) => {
  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return await Cart.create({
        user: userId,
        products: cartItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        })),
      });
    }

    const existingProductIds = cart.products.map((item) =>
      item.product.toString()
    );

    const newItems = cartItems.filter(
      (item) => !existingProductIds.includes(item.product._id.toString())
    );

    if (newItems.length > 0) {
      cart.products.push(
        ...newItems.map((item) => ({
          product: item.product._id,
          quantity: item.quantity,
        }))
      );
      await cart.save();
    }
    const updatedCart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    console.log(userId);
    return updatedCart;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateQuantity = async (userId, productId, quantity) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: userId, "products.product": productId },
      {
        $inc: { "products.$.quantity": quantity },
      },
      { new: true }
    ).populate("products.product");
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

    if (!cart) return null;
    cart.products = cart.products.filter((item) => item.product.stock > 0);

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
    ).populate("products.product");
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem,
  updateQuantity,
  updateCart,
};
