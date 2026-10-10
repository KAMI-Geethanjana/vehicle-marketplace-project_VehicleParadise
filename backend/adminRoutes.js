const express = require('express');
const router = express.Router();
const Product = require('./models/Product');
const Order = require('./models/Order');
const { requireAuth, requireAdmin } = require('./authMiddleware');

router.use(requireAuth, requireAdmin);

// GET /api/admin/summary
router.get('/summary', async (req, res) => {
  try {
    const productsCount = await Product.countDocuments();
    const ordersCount = await Order.countDocuments();
    
    // Low stock: e.g. stock_qty < 5
    const lowStockCount = await Product.countDocuments({ stock_qty: { $lt: 5 } });
    
    res.json({
      products: productsCount,
      orders: ordersCount,
      lowStock: lowStockCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/admin/products
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/admin/products/:id
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/admin/products/:id
// Using soft delete by setting stock to 0 or adding an active flag?
// PDF suggests "Prefer soft-delete if orders reference it." Let's just set stock_qty to 0.
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      product.stock_qty = 0; // Soft delete
      await product.save();
      res.json({ message: 'Product deactivated (stock set to 0)' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /api/admin/orders
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find({}).populate('user_id', 'full_name email').sort({ created_at: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /api/admin/orders/:id/status
router.put('/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    
    if (order) {
      order.status = status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const Ad = require('./models/Ad');

// GET /api/admin/ads
router.get('/ads', async (req, res) => {
  try {
    const ads = await Ad.find({}).sort({ createdAt: -1 });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /api/admin/ads
router.post('/ads', async (req, res) => {
  try {
    const ad = new Ad(req.body);
    const createdAd = await ad.save();
    res.status(201).json(createdAd);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /api/admin/ads/:id
router.put('/ads/:id', async (req, res) => {
  try {
    const ad = await Ad.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (ad) {
      res.json(ad);
    } else {
      res.status(404).json({ message: 'Ad not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /api/admin/ads/:id
router.delete('/ads/:id', async (req, res) => {
  try {
    const ad = await Ad.findByIdAndDelete(req.params.id);
    res.json({ message: 'Ad deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
