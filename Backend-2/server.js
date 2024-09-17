// server.js
// This should have probably been split but I'm lazy
// Patrick Lam
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const jwt = require('jsonwebtoken');  
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// User model
// Patrick Lam
const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// Order model
// Patrick Lam
const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    id: Number,
    name: String,
    price: Number,
    quantity: Number
  }],
  total: Number,
  customerName: String,
  customerEmail: String,
  eventDate: Date,
  venueAddress: String,
  creditCardLastFour: String,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);
const User = mongoose.model('User', UserSchema);

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

// Register route 
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }
    // Create new user
    user = new User({
      name,
      email,
      password,
    });
    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    // Save user to database
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create and sign a JWT
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,  // Add this to .env file
      { expiresIn: '1h' }  // Token expires in 1 hour
    );

    res.json({ msg: 'Logged in successfully', token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// For placing the order
app.post('/api/place-order', verifyToken, async (req, res) => {
  try {
    const { items, total, customerName, customerEmail, venueAddress, eventDate, creditCard } = req.body;
    const userId = req.userId;

    const newOrder = new Order({
      userId,
      items,
      total,
      customerName,
      customerEmail,
      eventDate,
      venueAddress,
      creditCardLastFour: creditCard // This should be the last 4 digits only
    });

    await newOrder.save();

    res.json({ msg: 'Order placed successfully', orderId: newOrder._id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Deals with the profile page and sees if there an order or not
app.get('/api/user-orders', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ date: -1 });
    res.json({ orders });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Server error' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));