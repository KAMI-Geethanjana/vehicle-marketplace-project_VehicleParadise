const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/vehicle_paradise';

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log('Connected to MongoDB.');
    const result = await User.deleteMany({});
    console.log(`Successfully deleted ${result.deletedCount} user(s) from the database.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
    process.exit(1);
  });
