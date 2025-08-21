const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Kullanıcı profilini getir
router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.userId; // JWT'den gelecek
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Kullanıcı profilini güncelle
router.put('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { age, gender, weight, height, goal, activityLevel, experience } = req.body;
    
    const user = await User.findByIdAndUpdate(
      userId,
      { profile: { age, gender, weight, height, goal, activityLevel, experience } },
      { new: true }
    ).select('-password');
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Premium kullanıcıları listele
router.get('/premium', async (req, res) => {
  try {
    const premiumUsers = await User.find({ isPremium: true })
      .select('username profile createdAt');
    
    res.json(premiumUsers);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

module.exports = router;
