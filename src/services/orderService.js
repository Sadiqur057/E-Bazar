const Cart = require("../models/Cart");
const Order = require("../models/Order");

const saveOrder = async (user, order) => {
  try {
    const userCart = await Cart.findOne({ user: user.id }).populate(
      "products.product"
    );
    if (!userCart) throw new Error("Cart is empty");

    const products = userCart.products;

    for (const { product, quantity } of products) {
      if (product.stock < quantity) {
        throw new Error(`${product.name} does not have enough stock`);
      }
    }

    const orderProducts = products.map(({ product, quantity }) => ({
      product: product._id,
      quantity,
      price: product.price,
    }));

    const totalAmount = orderProducts.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0
    );

    const newOrder = new Order({
      user: user.id,
      products: orderProducts,
      totalAmount,
      shippingAddress: order.shippingAddress,
      paymentMethod: order.paymentMethod,
      paymentStatus: order.paymentStatus,
    });

    await Promise.all(
      products.map(async ({ product, quantity }) => {
        product.stock -= quantity;
        return product.save();
      })
    );

    await newOrder.save();
    await Cart.findOneAndDelete({ user: user?.id });
    return newOrder;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getOrders = async (user) => {
  try {
    const orders = await Order.find({ user: user.id });
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};
const getAllOrders = async (user) => {
  try {
    const orders = await Order.find().populate({
      path: "user",
      select: "name email",
    });
    return orders;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateOrderStatus = async (orderId, status, user) => {
  try {
    const order = await Order.findById(orderId).populate("user");
    if (!order) throw new Error("Order not found");
    order.status = status;
    await order.save();
    return order;
  } catch (error) {
    throw new Error(error.message);
  }
};
module.exports = { saveOrder, getOrders, updateOrderStatus, getAllOrders };
