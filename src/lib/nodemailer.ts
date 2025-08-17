/**
 * @copyright 2025 codewithsadee
 * @license Apache-2.0
 */

/**
 * Node modules
 */
import nodemailer from 'nodemailer';

/**
 * Custom modules
 */
import config from '@/config';

// Create a reusable transporter object using SMTP transport for sending emails
const nodemailerTransport = nodemailer.createTransport({
  // I'm using my hostinger SMTP server, you can use any free SMTP server
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  pool: true,
  auth: {
    user: config.SMTP_AUTH_USERNAME,
    pass: config.SMTP_AUTH_PASS,
  },
});

export default nodemailerTransport;
