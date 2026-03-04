const express = require("express");
const cors = require("cors");
const path = require("path");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Middleware
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));
app.use('/images', express.static(path.join(__dirname, "../images")));

app.post("/submit", async (req, res) => {
  console.log("✅ Form data received:");
  console.log(req.body);

  // Prepare email content
  const emailContent = JSON.stringify(req.body, null, 2);

  // Determine which form was submitted
  let subject;
  if (req.body.name1) {
    // Tree service form (has name1 field)
    subject = "New Tree Service Quote Request";
  } else if (req.body.name2) {
    // Garage door form (has name2 field)
    subject = "New Garage Door Quote Request";
  } else {
    // Fallback
    subject = "New Form Submission - Letuli Inc";
  }

  const mailOptions = {
    from: "letuliincc@gmail.com",
    to: "letuliincc@gmail.com",
    subject: subject, // Use the dynamic subject
    text: `New form submission:\n\n${emailContent}`,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");

    res.json({
      success: true,
      message: "Form submitted successfully!",
      data: req.body,
    });
  } catch (error) {
    console.error("Error sending email:", error);

    res.json({
      success: false,
      message: "Error sending email",
      error: error.message,
    });
  }
});

// Serve index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
