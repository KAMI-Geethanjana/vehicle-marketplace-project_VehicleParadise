const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  stock_qty: { type: Number, default: 0 },
  image: { type: String },
  

  // Fields for frontend compatibility
  shortName: String,
  make: String,
  model: String,
  year: Number,
  priceDisplay: String,
  priceRating: String,
  location: String,
  mileage: String,
  fuel: String,
  transmission: String,
  bodyType: String,
  condition: String,
  category: String,
  emissionClass: String,
  features: [String],
  verified: Boolean,
  seller: String,
  sellerType: String,
  sellerRating: String,
  gallery: [String],
  description: String,
  safetyAndTrust: [String]
}, { timestamps: true });

// Virtual for ID mapping to work with frontend
productSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

productSchema.set('toJSON', {
  virtuals: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
