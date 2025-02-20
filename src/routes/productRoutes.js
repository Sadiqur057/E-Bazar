const express = require("express");

const {
  addProduct,
  getProducts,
  removeProduct,
} = require("../controllers/productController.js");
const { verifyToken, authorizeAdmin } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/add", verifyToken, authorizeAdmin, addProduct);
router.get("/", getProducts);
router.delete("/remove/:id", verifyToken, authorizeAdmin, removeProduct);

module.exports = router;
