const Data = require("../models/Data");
const zodiacService = require("../services/zodiacService");

const getZodiacSign = async (req, res, next) => {
  try {
    const { dob } = req.body;

    if (!dob) {
      return res.status(400).json({ error: "Date of birth is required." });
    }

    // Call the Service Layer
    const zodiacSign = await zodiacService.getZodiacSign(dob);

    // Side-Effect: Logging to DB
    try {
      await Data.create({
        type: "zodiac_lookup",
        request: { dob },
        response: { zodiacSign },
        meta: {
          source: "api",
          endpoint: "/api/zodiac",
        },
      });
    } catch (dbError) {
      console.error("Failed to store zodiac lookup:", dbError.message);
    }

    return res.status(200).json({ zodiacSign });
  } catch (error) {
    next(error);
  }
};

module.exports = { getZodiacSign };
