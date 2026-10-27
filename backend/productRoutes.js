const express = require('express');
const router = express.Router();
const Product = require('./models/Product');

// GET /api/products (Public catalog: only returns in-stock vehicles)
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({ stock_qty: { $gt: 0 } }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const { requireAuth } = require('./authMiddleware');

// POST /api/products
router.post('/', requireAuth, async (req, res) => {
  try {
    // Basic fields a user provides from SellVehiclePage
    const newProduct = new Product({
      ...req.body,
      stock_qty: req.body.stock_qty || 1
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
