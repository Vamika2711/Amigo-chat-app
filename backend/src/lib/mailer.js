// backend/src/lib/mailer.js (ESM version)

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send an email using Nodemailer
 * @param {Object} param0
 * @param {string} param0.to - Recipient email address
 * @param {string} param0.subject - Email subject
 * @param {string} param0.html - Email HTML content
 */
const sendEmail = async ({ to, subject, html }) => {
  const mailOptions = {
    from: `"Amigo" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendEmail;
