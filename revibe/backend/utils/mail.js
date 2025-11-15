const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

async function sendMail({ to, subject, html }) {
  if (!process.env.SMTP_USER) return console.warn('SMTP not configured');
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || process.env.SENDER_EMAIL,
      to,
      subject,
      html
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Email send error:', error.message);
  }
}

module.exports = { transporter, sendMail };
