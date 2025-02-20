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

const deleteProduct = async (productId) => {
  try {
    if (!productId) throw new Error("Product ID is required");

    const product = await Product.findByIdAndDelete(productId);
    if (!product) throw new Error("Product not found");
    const updatedProducts = await Product.find();
    return updatedProducts;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = { saveProduct, fetchProducts, deleteProduct };
