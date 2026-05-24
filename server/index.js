const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mydb')
.then(() => console.log('MongoDB Connected ✅'))
.catch((err) => console.log(err));

app.get('/', (req, res) => {
  res.send('Backend + MongoDB working 🚀');
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});