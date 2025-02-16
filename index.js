const express = require("express");
const cors = require("cors");
const connectDB = require("./src/config/db");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());

app.use(cors());

if (require.main === module) {
  connectDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}

module.exports = app;
