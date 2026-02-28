const Data = require('../models/Data');
const aiService = require('../services/aiService');

const analyzePalm = async (req, res, next) => {
  try {
    const additionalInfo = req.body.additionalInfo || '';

    // Call the Service Layer
    const message = await aiService.analyzePalm(additionalInfo);

    // Side-Effect: Logging to DB
    try {
      await Data.create({
        type: 'palm_analysis',
        request: { additionalInfo },
        response: { message },
        meta: {
          source: 'api',
          endpoint: '/api/ai/analyze',
          imageProvided: Boolean(req.file),
        },
      });
    } catch (dbError) {
      console.error('Failed to store palm analysis:', dbError.message);
    }

    res.json({ message });
  } catch (error) {
    console.error('Gemini API error:', error.message);
    next(error);
  }
};

const chatAstrologer = async (req, res, next) => {
  try {
    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Call the Service Layer
    const reply = await aiService.chatAstrologer(message);

    // Side-Effect: Logging to DB
    try {
      await Data.create({
        type: 'ai_chat',
        request: { message },
        response: { reply },
        meta: {
          source: 'api',
          endpoint: '/api/ai/chat',
        },
      });
    } catch (dbError) {
      console.error('Failed to store chat message:', dbError.message);
    }

    res.json({ reply });
  } catch (error) {
    console.error('Gemini Chat error:', error.message);
    next(error);
  }
};

const getDailyHoroscope = async (req, res, next) => {
  try {
    const { sign } = req.body;

    if (!sign) {
      return res.status(400).json({ error: "Zodiac sign is required" });
    }

    // Call the Service Layer
    const horoscope = await aiService.getDailyHoroscope(sign);

    // Side-Effect: Logging to DB
    try {
      await Data.create({
        type: 'daily_horoscope',
        request: { sign },
        response: { horoscope },
        meta: {
          source: 'api',
          endpoint: '/api/ai/horoscope',
        },
      });
    } catch (dbError) {
      console.error('Failed to store horoscope lookup:', dbError.message);
    }

    res.json({ horoscope });
  } catch (error) {
    console.error('Gemini Horoscope error:', error.message);
    next(error);
  }
};

module.exports = {
  analyzePalm,
  chatAstrologer,
  getDailyHoroscope
};
