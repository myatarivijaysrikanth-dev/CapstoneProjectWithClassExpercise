const nodemailer = require("nodemailer");
const User = require("../models/User");

const sendEmail = async (subject, text) => {
  try {
    const admin = await User.findOne({ roleId: 2, isActive: true });
    if (!admin) return;

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: admin.email,
      subject,
      text,
    });
  } catch (error) {
    console.log("Email notification skipped:", error.message);
  }
};

module.exports = sendEmail;
