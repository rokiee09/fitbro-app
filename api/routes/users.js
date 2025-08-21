import express from 'express';
import User from '../models/User.js';
import auth from '../middleware/auth.js';
const router = express.Router();

// Kullanıcı profili getir
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Kullanıcı profili güncelle
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      req.body,
      { new: true }
    ).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

// Premium durumu getir
router.get('/premium', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('isPremium');
    res.json({ isPremium: user.isPremium });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası' });
  }
});

export default router;
