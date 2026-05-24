const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mydb')
.then(() => console.log('MongoDB Connected ✅'))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('REST API Running 🚀');
});

// CREATE USER
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});
// GET USERS
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json(err);
  }
});
// UPDATE USER
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
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
    const user = await User.findByIdAndDelete(req.params.id);
    res.json(user);
  } catch (err) {
    res.json(err);
  }
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});