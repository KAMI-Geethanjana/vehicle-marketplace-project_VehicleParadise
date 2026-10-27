const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'buyer', 'seller'],
    default: 'customer'
  },
  profile: {
    phone: { type: String, default: '' },
    shipping_address: { type: String, default: '' },
    billing_address: { type: String, default: '' }
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
