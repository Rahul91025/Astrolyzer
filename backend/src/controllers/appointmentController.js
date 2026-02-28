const emailService = require('../services/emailService');

const bookAppointment = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'Name, email, and phone are required.' });
    }

    await emailService.sendAppointmentEmail(req.body);

    res.status(200).json({
      success: true,
      message: 'Appointment booked successfully! A confirmation has been sent.'
    });
  } catch (error) {
    console.error('Email sending error:', error);
    // Pass to global error handler
    error.status = 500;
    error.message = 'Failed to send appointment email.';
    next(error);
  }
};

module.exports = { bookAppointment };
