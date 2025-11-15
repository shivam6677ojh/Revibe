const express = require('express');
const router = express.Router();
const { sendMail } = require('../utils/mail');

// Send contact form email
router.post('/send', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Email to admin
    await sendMail({
      to: 'ojhashivam936@gmail.com',
      subject: `New Contact Message from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #10b981; border-radius: 10px;">
          <h2 style="color: #059669; text-align: center;">📩 New Contact Message</h2>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 10px 0;"><strong>Message:</strong></p>
            <div style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #10b981;">
              ${message}
            </div>
          </div>
          
          <p style="text-align: center; color: #6b7280; font-size: 12px; margin-top: 30px;">
            Sent via ReVibe Contact Form 🌿
          </p>
        </div>
      `
    });

    // Confirmation email to user
    await sendMail({
      to: email,
      subject: 'Thanks for contacting ReVibe! 🌿',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 2px solid #10b981; border-radius: 10px;">
          <h2 style="color: #059669; text-align: center;">Thank You, ${name}! 🌿</h2>
          
          <p style="font-size: 16px; color: #374151; line-height: 1.6;">
            We've received your message and our team will get back to you within 24 hours.
          </p>
          
          <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #059669; margin-top: 0;">Your Message:</h3>
            <p style="color: #6b7280;">${message}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL || 'http://localhost:3001'}" 
               style="background: linear-gradient(to right, #10b981, #14b8a6); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
              Visit ReVibe
            </a>
          </div>
          
          <p style="text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px;">
            🌍 Building a sustainable future, one event at a time.<br>
            <strong>ReVibe Team</strong>
          </p>
        </div>
      `
    });

    res.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message. Please try again.' });
  }
});

module.exports = router;
