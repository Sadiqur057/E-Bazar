const express = require("express");

const {
  addProduct,
  getProducts,
} = require("../controllers/productController.js");
const { verifyToken, authorizeAdmin } = require("../middlewares/auth.js");

const router = express.Router();

router.post("/add", verifyToken, authorizeAdmin, addProduct);
router.get("/", verifyToken, authorizeAdmin, getProducts);

module.exports = router;
