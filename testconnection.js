const mongoose = require('mongoose');
require('dotenv').config();

// Check environment variable
const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
    console.error('MongoDB URI not found in environment variables');
    process.exit(1);
}

// Connect to MongoDB
mongoose.connect(mongoUri).then(() => {
    console.log('Connected to MongoDB Atlas');
    mongoose.connection.close();
}).catch((error) => {
    console.error('Error connecting to MongoDB Atlas:', error.message);
});
