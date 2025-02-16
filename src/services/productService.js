const Product = require("../models/Product");

const saveProduct = async (product) => {
  try {
    return await Product.create(product);
  } catch (error) {
    throw new Error(error.message);
  }
};

const fetchProducts = async () => {
  try {
    return await Product.find();
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { saveProduct, fetchProducts };
