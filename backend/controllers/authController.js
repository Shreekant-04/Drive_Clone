const User = require("../models/User");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const multer = require("multer");
require("dotenv").config();
const { Buffer } = require("buffer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const verifyTransporter = async () => {
  try {
    await transporter.verify();
    console.log("SMTP server connection established");
  } catch (error) {
    console.error("SMTP server connection failed:", error);
  }
};

verifyTransporter();

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    // console.log("Email sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

exports.sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    let user = (await User.findOne({ email })) || new User({ email });

    const otp = generateOTP();
    const otpExpires = Date.now() + 10 * 60 * 1000;

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    await sendEmail(
      email,
      "Your OTP Code",
      `Your OTP code is ${otp}. It will expire in 10 minutes.`
    );

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ error: "Invalid or expired OTP" });
    }

    user.signInDate = Date.now();
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "6h",
    });

    res.status(200).json({ token, message: "Login successful" });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Authentication failed" });
  }
};

exports.sendTestEmail = async (req, res) => {
  try {
    await sendEmail(
      process.env.TEST_EMAIL || "test@example.com",
      "Test Email",
      "This is a test email from the authentication system."
    );
    res.status(200).json({ message: "Test email sent successfully" });
  } catch (error) {
    console.error("Error sending test email:", error);
    res.status(500).json({ error: "Failed to send test email" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const id = req.user.id; // User ID from JWT
    const { name } = req.body; // Extracting name from request body

    // Get the image buffer directly from Multer
    const profileLinkBuffer = req.file ? req.file.buffer : null;

    // Convert the buffer to a Base64 string if it exists
    const profileLinkBase64 = profileLinkBuffer
      ? profileLinkBuffer.toString("base64")
      : null;

    // Prepare update object
    const updateData = { name }; // Initialize with the name

    // Only add profileLink to updateData if it's not null
    if (profileLinkBase64) {
      updateData.profileLink = profileLinkBase64;
    }

    // Find the user by ID and update
    const updateUser = await User.findOneAndUpdate({ _id: id }, updateData, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Profile image and name updated successfully",
      user: updateUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
