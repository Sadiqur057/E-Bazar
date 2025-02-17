const express = require('express');
const { addToCart, getCartItems, removeCartItem } = require('../controllers/cartController.js');
const { verifyToken } = require('../middlewares/auth.js');

const router = express.Router();

router.post('/add', verifyToken, addToCart);
router.get('/', verifyToken, getCartItems);
router.delete('/remove/:productId', verifyToken, removeCartItem);

module.exports = router;