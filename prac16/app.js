const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("views"));

// Route: Contact Form
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "contact.html"));
});

// Route: Handle form submission
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  // Basic Validation
  if (!name || !email || !message) {
    return res.send(`
      <h3 style="color:red;text-align:center;">❌ All fields are required.</h3>
      <a href="/">Go Back</a>
    `);
  }

  // Configure NodeMailer
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Mail Options
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.RECEIVER_EMAIL,
    subject: `New Message from ${name}`,
    text: `You have received a new message:\n\nName: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  // Send Email
  try {
    await transporter.sendMail(mailOptions);
    res.send(`
      <h3 style="color:green;text-align:center;">✅ Message sent successfully!</h3>
      <a href="/">Go Back</a>
    `);
  } catch (error) {
    console.error(error);
    res.send(`
      <h3 style="color:red;text-align:center;">❌ Failed to send message. Try again later.</h3>
      <a href="/">Go Back</a>
    `);
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
