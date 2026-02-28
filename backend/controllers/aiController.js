const axios = require('axios');
const Data = require('../models/Data');

const analyzePalm = async (req, res) => {
  try {
    const additionalInfo = req.body.additionalInfo || '';
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key is not configured" });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const prompt = `
You are an expert palm reader and astrologer. You will analyze the provided image of a palm and give a detailed reading based on the traditional principles of palmistry.

User's additional information: ${additionalInfo}

Look at the following features and describe them carefully:
- The major lines: heart line, head line, life line, fate line (if visible).
- The shape, length, and curvature of each line.
- The mounts (raised areas) on the palm (e.g., Mount of Venus, Mount of Jupiter).
- The fingers’ shapes and lengths.
- Any notable marks, breaks, or special signs.

Based on these observations, provide a comprehensive interpretation covering:
- Personality traits
- Emotional tendencies
- Potential life events or challenges
- Strengths and weaknesses

Present your analysis in a friendly and insightful tone, just like a professional palm reader would during a session.
`;

    // Note: Since we are migrating, if image support needs actual image parts, we add it here.
    // Assuming the frontend currently just sends a prompt or we process it as text for now
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    };

    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const message = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received.';

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
    console.error('Gemini API error:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
};

const chatAstrologer = async (req, res) => {
  try {
    const message = typeof req.body?.message === 'string' ? req.body.message.trim() : '';
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "API key is not configured" });
    }

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const prompt = `
आप "ज्योति-दीप" नाम के विशेषज्ञ AI ज्योतिष मार्गदर्शक हैं।
यूज़र आपसे आवाज़ में बात कर रहा है।

कड़े नियम:
1. हमेशा हिंदी (देवनागरी) में उत्तर दें।
2. केवल ज्योतिष से जुड़े विषयों पर उत्तर दें: राशि, कुंडली, ग्रह-गोचर, दशा, नक्षत्र, विवाह/करियर/स्वास्थ्य पर ज्योतिषीय मार्गदर्शन।
3. अगर प्रश्न ज्योतिष से बाहर हो, विनम्रता से कहें कि आप केवल ज्योतिष प्रश्नों में मदद करते हैं और यूज़र से ज्योतिष संबंधी प्रश्न पूछने को कहें।
4. उत्तर छोटा, स्पष्ट और बोलकर सुनाने योग्य रखें: अधिकतम 2 वाक्य।
5. भविष्यवाणी को निश्चित दावे की तरह न कहें; मार्गदर्शक, संतुलित और जिम्मेदार भाषा रखें।

यूज़र का संदेश: "${message}"

अब केवल अंतिम उत्तर दें।
`;

    const requestBody = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const response = await axios.post(apiUrl, requestBody, {
      headers: { 'Content-Type': 'application/json' },
    });

    const reply = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || 'The stars are silent right now.';

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
    console.error('Gemini Chat error:', error.response?.data || error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  analyzePalm,
  chatAstrologer
};
