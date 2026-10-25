const express = require('express');
const router = express.Router();
const Order = require('./models/Order');
const Product = require('./models/Product');
const { requireAuth } = require('./authMiddleware');

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'your_super_secret_key_change_in_production';

// POST /api/orders
router.post('/', requireAuth, async (req, res) => {
  try {
    const { items, total_amount, customer_name, customer_email, customer_phone, payment_method } = req.body;
    
    // Validate cart
    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }
    
    // Update stock safely & mark vehicle as Reserved / Under Offer
    const reservedProductIds = [];
    for (const item of items) {
      let product = null;
      if (item.product_id && mongoose.Types.ObjectId.isValid(item.product_id)) {
        product = await Product.findById(item.product_id);
      } else if (item.name) {
        product = await Product.findOne({ name: item.name });
      }

      if (product) {
        product.stock_qty = Math.max(0, (product.stock_qty || 1) - (item.quantity || 1));
        product.status = 'Reserved';
        product.isReserved = true;
        await product.save();
        reservedProductIds.push(product._id.toString());
      } else if (item.product_id) {
        reservedProductIds.push(item.product_id);
      }
    }

    const order = new Order({
      user_id: req.user.user_id,
      customer_name,
      customer_email,
      customer_phone,
      payment_method: payment_method || 'PayHere',
      total_amount,
      items
    });

    const createdOrder = await order.save();
    res.status(201).json({ ...createdOrder.toJSON(), reservedProductIds });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/orders/myorders
router.get('/myorders', requireAuth, async (req, res) => {
  try {
    const orders = await Order.find({ user_id: req.user.user_id }).populate('items.product_id');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
