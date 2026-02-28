const getZodiac = require("../utils/zodiacHelper");
const Data = require("../models/Data");

const getZodiacSign = async (req, res) => {
  const { dob } = req.body;

  if (!dob) {
    return res.status(400).json({ error: "Date of birth is required." });
  }

  const zodiacSign = getZodiac(new Date(dob));

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
};

module.exports = { getZodiacSign };
