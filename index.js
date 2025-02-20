const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
const authRoutes = require("./src/routes/authRoutes");
const productRoutes = require("./src/routes/productRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const wishlistRoutes = require("./src/routes/wishlistRoutes");
const orderRoutes = require("./src/routes/orderRoutes");
const userRoutes = require("./src/routes/userRoutes");

app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/user", userRoutes);

if (require.main === module) {
  connectDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
