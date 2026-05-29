const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(
  'mongodb://127.0.0.1:27017/usercrud'
)
.then(() =>
  console.log('MongoDB Connected ✅')
)
.catch((err) =>
  console.log(err)
);

// AUTH MIDDLEWARE
const auth = (req, res, next) => {
  const token =
    req.header('Authorization');

  if (!token) {
    return res.json({
      message: 'Access denied'
    });
  }

  try {
    const verified =
      jwt.verify(
        token,
        'secretkey'
      );

    req.user = verified;
    next();
  } catch {
    res.json({
      message: 'Invalid token'
    });
  }
};

// GET USERS
app.get('/users', async (req, res) => {
  const users =
    await User.find();

  res.json(users);
});

// CREATE USER (SIGNUP)
app.post('/users', async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    if (
      !name ||
      !email ||
      !password ||
      name.trim() === '' ||
      email.trim() === '' ||
      password.trim() === ''
    ) {
      return res.json({
        message:
          'Please fill all fields'
      });
    }

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.json({
        message:
          'Email already exists'
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user =
      await User.create({
        name,
        email,
        password: hashedPassword
      });

    const token = jwt.sign(
      { id: user._id },
      'secretkey',
      { expiresIn: '1h' }
    );

    res.json({
      user,
      token
    });
  } catch (err) {
    res.json(err);
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  try {
    const { email, password } =
      req.body;

    if (!email || !password) {
      return res.json({
        message:
          'Please enter email and password'
      });
    }

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.json({
        message:
          'User not found'
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.json({
        message:
          'Wrong password'
      });
    }

    const token = jwt.sign(
      { id: user._id },
      'secretkey',
      { expiresIn: '1h' }
    );

    res.json({
      message:
        'Login successful',
      token
    });
  } catch (err) {
    res.json(err);
  }
});

// PROTECTED ROUTE
app.get('/profile', auth, (req, res) => {
  res.json({
    message:
      'Protected route accessed',
    user: req.user
  });
});

// UPDATE USER
app.put('/users/:id', async (req, res) => {
  try {
    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

// DELETE USER
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        'User deleted'
    });
  } catch (err) {
    res.json(err);
  }
});

app.listen(5000, () =>
  console.log(
    'Server running on port 5000'
  )
);