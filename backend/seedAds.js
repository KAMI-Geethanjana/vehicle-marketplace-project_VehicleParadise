require('dotenv').config();
const mongoose = require('mongoose');
const Ad = require('./models/Ad');
const connectDB = require('./database');

const seedAds = async () => {
  await connectDB();
  await Ad.deleteMany({});
  
  const dummyAd = new Ad({
    title: 'Special 50% Off on Vehicle Insurance',
    imageUrl: 'https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&w=1200&q=80',
    link: '#',
    active: true
  });
  
  await dummyAd.save();
  console.log('Dummy Ad inserted!');
  process.exit();
};

seedAds();
