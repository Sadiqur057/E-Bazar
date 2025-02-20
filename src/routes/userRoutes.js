const express = require("express");
const { verifyToken, authorizeAdmin } = require("../middlewares/auth");
const { getUsers } = require("../controllers/userController");

const router = express.Router();

router.get("/", verifyToken, authorizeAdmin, getUsers);

module.exports = router;