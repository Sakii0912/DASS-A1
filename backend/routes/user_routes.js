const express = require('express');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
//* sending failure result in json format

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

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const user_entity = await User.findOne({ email });
    if (!user_entity) return res.status(404).send('User not found.');
    res.json(user_entity);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

router.post('/edit_profile', authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    const user_entity = await User.findOne({ email });
    if (!user_entity) return res.status(404).send('User not found.');
    await User.updateOne({ email: email }, { $set: req.body });
    res.json({ message: 'Profile updated successfully.' });
    } catch (err) {
      res.status(500).send('Server error');
    }
  });


router.post('/register', async (req, res) => {
  try {
    const { fname, lname, email, age, contact_no, password } = req.body;

    if(!email.endsWith('iiit.ac.in')) {
      return res.status(400).json({ message: 'Only IIITH students emails are allowed...' });
    }
    const user_exists = await User.findOne({ email });
    if(user_exists) {
      return res.status(400).json({ message: 'User already exists...' });
    }

    const new_user = new User({
      fname,
      lname,
      email,
      age,
      contact_no,
      password,
    });
    await new_user.save();
    res.status(201).json({ message: 'User registered successfully...' });

  }
  catch (error) {
    res.status(500).json({ message: 'Internal server error...', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user_entity = await User.findOne({ email });
    if(!user_entity) {
      return res.status(404).json({ message: 'User does not exist...' });
    }

    const password_match = await bcrypt.compare(password, user_entity.password);
    if(!password_match) {
      return res.status(401).json({ message: 'Invalid credentials...' });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error...' });
  }
});

module.exports = router;
