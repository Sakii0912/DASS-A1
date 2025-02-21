const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Item = require('../models/item');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
};

router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { itemId, quantity } = req.body;
    const user = await User.findOne({ email: req.user.email });

    if (!user) return res.status(404).json({ error: 'User not found' });

    const item = await Item.findById(itemId);
    if (!item) return res.status(404).json({ error: 'Item not found' });

    const cartItem = user.cart.find((cart) => cart.itemId.toString() === itemId);
    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      user.cart.push({ itemId, quantity });
    }

    await user.save();
    res.status(200).json({ message: 'Item added to cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: 'Error adding item to cart' });
  }
});

router.get('/view_cart', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate('cart.itemId');
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user.cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error fetching cart' });
  }
});

router.delete('/remove/:itemId', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.cart = user.cart.filter((cartItem) => cartItem.itemId.toString() !== req.params.itemId);

    await user.save();
    res.json({ message: 'Item removed from cart', cart: user.cart });
  } catch (error) {
    res.status(500).json({ error: 'Error removing item from cart' });
  }
});

module.exports = router;
