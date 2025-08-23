import express from 'express';
import Message from '../models/Message.js';
const router = express.Router();

// Mesaj gönder
router.post('/send', async (req, res) => {
  try {
    const { senderId, receiverId, content, roomId } = req.body;
    
    const message = new Message({
      sender: senderId,
      receiver: receiverId,
      content,
      roomId
    });
    
    await message.save();
    
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Oda mesajlarını getir
router.get('/room/:roomId', async (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = await Message.find({ roomId })
      .populate('sender', 'username')
      .populate('receiver', 'username')
      .sort({ createdAt: 1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Kullanıcının mesajlarını getir
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const messages = await Message.find({
      $or: [{ sender: userId }, { receiver: userId }]
    })
      .populate('sender', 'username')
      .populate('receiver', 'username')
      .sort({ createdAt: -1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

export default router;
