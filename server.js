const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error('MongoDB URI not found in environment variables');
  process.exit(1);
}

mongoose.connect(mongoUri).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch((error) => {
  console.error('Error connecting to MongoDB Atlas:', error.message);
});

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const newUser = new User({ username, email, password });
  await newUser.save();
  res.send('User registered successfully');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  console.log(`Login attempt: ${username} / ${password}`);
  const user = await User.findOne({ username, password });
  if (user) {
    console.log('Login successful');
    res.send('Login successful');
  } else {
    console.log('Invalid credentials');
    res.status(401).send('Invalid credentials');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
