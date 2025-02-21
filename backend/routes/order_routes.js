const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/user');
const Item = require('../models/item');
const Order = require('../models/order');
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

const generateOTP = async () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return await bcrypt.hash(otp, 10);
};

router.post('/place_order', authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).populate('cart.itemId');
    if (!user || user.cart.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    let totalAmount = 0;
    const cartItems = user.cart.map((cartItem) => ({
      itemId: cartItem.itemId._id,
      name: cartItem.itemId.name,
      sellerEmail: cartItem.itemId.seller_id,
      quantity: cartItem.quantity,
      price: cartItem.itemId.price * cartItem.quantity
    }));
    totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);
    const otpHash = await generateOTP();

    const order = new Order({
      buyerEmail: req.user.email,
      sellerEmails: [...new Set(cartItems.map(item => item.sellerEmail))],
      items: cartItems,
      totalAmount,
      hashedOTP: otpHash,
      status: 'Pending'
    });

    await order.save();
    user.cart = [];
    await user.save();

    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error placing order' });
  }
});

router.get('/buyer', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ buyerEmail: req.user.email });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching buyer orders' });
  }
});

router.get('/seller', authenticateToken, async (req, res) => {
  try {
    const orders = await Order.find({ sellerEmails: req.user.email }).populate('items.itemId');
    const items = orders.flatMap(order => order.items.filter(item => item.sellerEmail === req.user.email));
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching seller items' });
  }
});

router.post('/complete/:id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.sellerEmail !== req.user.email)
      return res.status(403).json({ error: 'Not authorized' });

    const { otp } = req.body;
    const isMatch = await bcrypt.compare(otp, order.hashedOTP);
    if (!isMatch) return res.status(400).json({ error: 'Invalid OTP' });

    order.status = 'Completed';
    await order.save();
    res.json({ message: 'Order completed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error completing order' });
  }
});

module.exports = router;
