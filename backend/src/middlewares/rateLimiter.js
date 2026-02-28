const rateLimit = require('express-rate-limit');

/**
 * Global Rate Limiter: Prevent DDoS and API Spam (100 requests per 15 minutes)
 */
const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests from this IP, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

module.exports = {
    globalLimiter,
};
