const express = require("express");
const { getZodiacSign } = require("../controllers/zodiacController");

const router = express.Router();

router.post("/", getZodiacSign);

module.exports = router;
