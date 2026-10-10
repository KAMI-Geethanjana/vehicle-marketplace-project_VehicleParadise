const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  unit_price: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customer_name: { type: String },
  customer_email: { type: String },
  customer_phone: { type: String },
  total_amount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Paid', 'Processing', 'Shipped', 'Completed'], default: 'Pending' },
  items: [orderItemSchema]
}, { timestamps: true });

// Virtual for ID
orderSchema.virtual('id').get(function() {
  return this._id.toHexString();
});

orderSchema.set('toJSON', {
  virtuals: true
});

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
