const orderService = require("../services/orderService");

const createOrder = async (req, res) => {
  try {
    const order = await orderService.saveOrder(req.user, req.body);
    res.status(201).send({
      message: "Order created successfully",
      success: true,
      data: order,
    });
  } catch (error) {
    return res.status(409).send({ message: error.message, success: false });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await orderService.getOrders(req.user);
    res.send({
      message: "Orders fetched successfully",
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(409).send({ message: error.message, success: false });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.send({
      message: "All Orders fetched successfully",
      success: true,
      data: orders,
    });
  } catch (error) {
    return res.status(409).send({ message: error.message, success: false });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const order= await orderService.updateOrderStatus(req.params.id, req.body.status);
    res.send({ message: "Order status updated", success: true, data: order });
  } catch (error) {
    return res.status(409).send({ message: error.message, success: false });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus,getAllOrders };
