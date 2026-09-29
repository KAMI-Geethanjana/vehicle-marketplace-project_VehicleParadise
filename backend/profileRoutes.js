const express = require('express');
const User = require('./models/User');
const { requireAuth } = require('./authMiddleware');
const bcrypt = require('bcryptjs');
const router = express.Router();

// GET /api/profile
router.get('/', requireAuth, async (req, res) => {
  const userId = req.user.user_id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'Profile not found' });

    res.json({
      full_name: user.full_name,
      email: user.email,
      role: user.role,
      created_at: user.createdAt,
      phone: user.profile.phone,
      shipping_address: user.profile.shipping_address,
      billing_address: user.profile.billing_address
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /api/profile
router.put('/', requireAuth, async (req, res) => {
  const userId = req.user.user_id;
  const { phone, shipping_address, billing_address } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.profile.phone = phone || user.profile.phone;
    user.profile.shipping_address = shipping_address || user.profile.shipping_address;
    user.profile.billing_address = billing_address || user.profile.billing_address;

    await user.save();
    res.json({ success: true, message: 'Profile updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating profile' });
  }
});

// PUT /api/profile/password
router.put('/password', requireAuth, async (req, res) => {
  const userId = req.user.user_id;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(oldPassword, user.password_hash);
    if (!isMatch) return res.status(400).json({ error: 'Incorrect old password' });

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);

    user.password_hash = hashedNewPassword;
    await user.save();

    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error updating password' });
  }
});

module.exports = router;
