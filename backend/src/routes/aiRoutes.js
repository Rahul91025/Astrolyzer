const express = require('express');
const router = express.Router();
const multer = require('multer');

// Reusing multer
const storage = multer.memoryStorage();
const upload = multer({ storage });

const { analyzePalm, chatAstrologer, getDailyHoroscope } = require('../controllers/aiController');

router.post('/analyze', upload.single('image'), analyzePalm);
router.post('/chat', chatAstrologer);
router.post('/horoscope', getDailyHoroscope);

module.exports = router;
