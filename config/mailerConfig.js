const nodemailer = require("nodemailer");
require("dotenv").config();

const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
  secure: process.env.SMTP_PORT == 465, 
  tls: {
    rejectUnauthorized: false,
  },
});

mailer.verify((error, success) => {
  if (error) {
    console.log("SMTP Connection Error:", error);
  } else {
    console.log("SMTP Server is ready to send emails");
  }
});

module.exports = mailer;
