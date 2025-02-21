const express = require('express');
const router = express.Router();
const item = require('../models/item');
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

router.post('/create_item', authenticateToken, async (req, res) => {
  try {
    const { id, name, price, description, quantity, category } = req.body;
    const seller_id = req.user.email;

   const item_exists = await item.findOne({ id, seller_id });
    if (item_exists) {
      return res.status(400).json({ message: 'Item already exists...' });
    }
    const new_item = new item({
      id,
      name,
      price,
      description,
      quantity,
      category,
      seller_id,
    });
    await new_item.save();
    res.status(201).send('Item added successfully.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

router.get('/get_all_items', async (req, res) => {
  try {
    const items = await item.find();
    res.json(items);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

router.get('/search_items', async (req, res) => {
  try {
    const { search, category, minPrice, maxPrice } = req.query;

    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    const items = await item.find(query);
    console.log(items);
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching items' });
  }
});


router.get('/get_item/:id', async (req, res) => {
  try {
    const item_id = req.params.id;
    const item_entity = await item.findById(item_id);
    res.json(item_entity);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
