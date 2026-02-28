const nodemailer = require('nodemailer');

const RECEIVER_EMAIL = 'rahulgupta109037@gmail.com';

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendAppointmentEmail({ name, email, phone, gender, birthDate, birthTime, birthPlace, service, preferredTime, channel, notes }) {
        const htmlEmail = `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { margin: 0; padding: 0; background: #0a0a0a; font-family: 'Segoe UI', Arial, sans-serif; }
    .container { max-width: 600px; margin: 0 auto; background: #111; border: 1px solid #222; border-radius: 12px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 40px 30px; text-align: center; }
    .header h1 { color: #E5C07B; font-size: 28px; margin: 0 0 8px; letter-spacing: 3px; text-transform: uppercase; }
    .header p { color: #999; font-size: 13px; margin: 0; letter-spacing: 2px; text-transform: uppercase; }
    .badge { display: inline-block; background: #E5C07B; color: #000; padding: 6px 16px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-top: 16px; }
    .body { padding: 30px; }
    .section { margin-bottom: 24px; }
    .section-title { color: #E5C07B; font-size: 10px; font-weight: 700; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid #222; }
    .row { display: flex; margin-bottom: 8px; }
    .label { color: #666; font-size: 13px; min-width: 140px; }
    .value { color: #eee; font-size: 14px; font-weight: 500; }
    .highlight { background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 8px; padding: 16px; margin-top: 8px; }
    .channel-badge { display: inline-block; background: #E5C07B; color: #000; padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 700; }
    .notes-box { background: #1a1a1a; border-left: 3px solid #E5C07B; padding: 12px 16px; color: #ccc; font-size: 13px; line-height: 1.6; font-style: italic; border-radius: 0 8px 8px 0; }
    .footer { padding: 20px 30px; background: #0a0a0a; text-align: center; border-top: 1px solid #222; }
    .footer p { color: #555; font-size: 11px; margin: 0; letter-spacing: 1px; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 6px 0; }
    .td-label { color: #666; font-size: 13px; width: 140px; vertical-align: top; }
    .td-value { color: #eee; font-size: 14px; font-weight: 500; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>✦ Cosmic Astrology</h1>
      <p>New Appointment Booking</p>
      <div class="badge">New Session Request</div>
    </div>
    <div class="body">
      <div class="section">
        <div class="section-title">Client Identity</div>
        <table>
          <tr><td class="td-label">Name</td><td class="td-value">${name}</td></tr>
          <tr><td class="td-label">Email</td><td class="td-value"><a href="mailto:${email}" style="color:#E5C07B;text-decoration:none;">${email}</a></td></tr>
          <tr><td class="td-label">Phone</td><td class="td-value"><a href="tel:${phone}" style="color:#E5C07B;text-decoration:none;">${phone}</a></td></tr>
          <tr><td class="td-label">Gender</td><td class="td-value">${gender || 'Not specified'}</td></tr>
        </table>
      </div>
      <div class="section">
        <div class="section-title">Birth Details</div>
        <table>
          <tr><td class="td-label">Date of Birth</td><td class="td-value">${birthDate || 'Not provided'}</td></tr>
          <tr><td class="td-label">Time of Birth</td><td class="td-value">${birthTime || 'Not provided'}</td></tr>
          <tr><td class="td-label">Place of Birth</td><td class="td-value">${birthPlace || 'Not provided'}</td></tr>
        </table>
      </div>
      <div class="section">
        <div class="section-title">Session Preferences</div>
        <div class="highlight">
          <table>
            <tr><td class="td-label">Service</td><td class="td-value">${service || 'Not selected'}</td></tr>
            <tr><td class="td-label">Preferred Time</td><td class="td-value">${preferredTime || 'Not selected'}</td></tr>
            <tr><td class="td-label">Channel</td><td class="td-value"><span class="channel-badge">${channel || 'Not selected'}</span></td></tr>
          </table>
        </div>
      </div>
      ${notes ? `
      <div class="section">
        <div class="section-title">Additional Notes</div>
        <div class="notes-box">${notes}</div>
      </div>
      ` : ''}
    </div>
    <div class="footer">
      <p>✦ Cosmic Astrology — Appointment System ✦</p>
      <p style="margin-top:8px;">Received on ${new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })}</p>
    </div>
  </div>
</body>
</html>`;

        const mailOptions = {
            from: `"Cosmic Astrology" <${process.env.EMAIL_USER}>`,
            to: RECEIVER_EMAIL,
            subject: `✦ New Appointment: ${name} — ${service || 'General Consultation'}`,
            html: htmlEmail,
            replyTo: email,
        };

        return await this.transporter.sendMail(mailOptions);
    }
}

module.exports = new EmailService();
