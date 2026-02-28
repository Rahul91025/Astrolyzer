const axios = require('axios');

class AIService {
    constructor() {
        this.apiKey = process.env.GEMINI_API_KEY;
        this.apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${this.apiKey}`;
    }

    async generate(prompt) {
        if (!this.apiKey) {
            throw new Error("API key is not configured");
        }

        const requestBody = {
            contents: [{ parts: [{ text: prompt }] }],
        };

        const response = await axios.post(this.apiUrl, requestBody, {
            headers: { 'Content-Type': 'application/json' },
        });

        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    }

    async analyzePalm(additionalInfo) {
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
        const result = await this.generate(prompt);
        return result || 'No response received.';
    }

    async chatAstrologer(message) {
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
        const result = await this.generate(prompt);
        return result || 'The stars are silent right now.';
    }

    async getDailyHoroscope(sign) {
        const prompt = `
You are a mystical, highly intuitive master astrologer. 
Generate a short, empowering, and beautifully written daily horoscope (in English) for the zodiac sign: ${sign}.

Guidelines:
1. Tone must be premium, cosmic, mysterious, yet highly uplifting and actionable.
2. Only provide the reading, no intro or outro like "Here is your reading".
3. Structure it in one strong paragraph (3-4 sentences max).
4. Focus on today's planetary energy for ${sign}, touching lightly on career, love, or personal growth.
`;
        const result = await this.generate(prompt);
        return result || 'The stars are silent right now, but your path remains bright.';
    }
}

module.exports = new AIService();
