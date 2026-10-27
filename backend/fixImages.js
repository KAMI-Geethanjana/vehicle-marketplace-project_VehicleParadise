require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');
const connectDB = require('./database');

const safeCarImages = [
  'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80'
];

const safeBikeImages = [
  'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
];

const fixDB = async () => {
  await connectDB();
  const products = await Product.find({});
  
  let carIndex = 0;
  let bikeIndex = 0;

  for (const product of products) {
    let newImage = '';
    
    if (product.category === 'Motorcycles') {
      newImage = safeBikeImages[bikeIndex % safeBikeImages.length];
      bikeIndex++;
    } else {
      newImage = safeCarImages[carIndex % safeCarImages.length];
      carIndex++;
    }
    
    product.image = newImage;
    product.gallery = [newImage];
    
    await product.save();
  }
  
  console.log('Fixed all broken images securely!');
  process.exit();
};

fixDB();
