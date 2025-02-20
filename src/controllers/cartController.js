const Cart = require("../models/Cart");
const cartService = require("../services/cartService");
const addToCart = async (req, res) => {
  try {
    const { user } = req;
    const { productId, quantity } = req.body;
    const cart = await cartService.addToCart(user.id, productId, quantity);
    res
      .status(200)
      .send({ success: true, data: cart, message: "Product added to cart" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const updateCart = async (req, res) => {
  try {
    const { id } = req.user;
    const { cartItems } = req.body;
    const cart = await cartService.updateCart(id, cartItems);
    return res.send({
      success: true, data: cart, message: "Updated cart"
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const updateQuantity = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { quantity } = req.body;
    const cart = await cartService.updateQuantity(user?.id, id, quantity);
    console.log(cart);
    res
      .status(200)
      .send({ success: true, data: cart, message: "Quantity updated" });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const getCartItems = async (req, res) => {
  try {
    const { user } = req;
    const cart = await cartService.getCartItems(user);
    res.status(200).send({ success: true, data: cart });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

const removeCartItem = async (req, res) => {
  try {
    const { user } = req;
    const { productId } = req.params;
    const cart = await cartService.removeCartItem(user, productId);
    res.status(200).send({
      success: true,
      data: cart,
      message: "The item is removed successfully",
    });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  removeCartItem,
  updateQuantity,
  updateCart,
};
