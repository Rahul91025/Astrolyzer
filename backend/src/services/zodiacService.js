const getZodiac = require('../utils/zodiacHelper');

class ZodiacService {
    async getZodiacSign(dob) {
        return getZodiac(new Date(dob));
    }
}

module.exports = new ZodiacService();
