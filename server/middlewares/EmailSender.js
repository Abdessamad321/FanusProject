const nodemailer = require("nodemailer")

require("dotenv").config();
const passwordKey = process.env.PASS_KEY;

function sendWelcomeEmail(id, email, password) {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "fanousprod@gmail.com",
        pass: passwordKey,
      },
    });
  
    const mailContent = {
      from: "fanousprod@gmail.com",
      to: email,
      subject: "Welcome to FanousPROD",
      html: `
              <div style="font-family: Arial, sans-serif; padding: 20px;">
              <img src="https://res.cloudinary.com/diayypz06/image/upload/v1705678599/fanousprod/hd9lsjc8txp6owlgpafd.jpg" alt="LOGO" style="max-width: 260px; height: auto;" /> 
              <h2 style="color: #000;">Welcome to Our Website!</h2>
              <p style="color: #555;">Thank you for signing up. Your account has been created successfully.</p>
              <p style="color: #555;">Now you can log in using your credentials:</p>
              <p style="color: #555;"><strong>Email:</strong> ${email}</p>
              <p style="color: #555;"><strong>Password:</strong> ${password}</p>
              <p style="color: #555;">Please do not share your login information with anyone.</p>
              <p style="color: #555;">Click <a href="http://localhost:7000/customer/validate/${id}" style="color: #007BFF; text-decoration: none; font-weight: bold;">here</a> to log in to your account.</p>
              </div>
          `,
    };
  
    transporter.sendMail(mailContent, (err, info) => {
      if (err) {
        console.error(err);
      } else {
        console.log("Email sent:", info.response);
      }
    });
  }

  function deletionEmail(deletionReason, improveService) {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "fanousprod@gmail.com",
        pass: passwordKey, 
      },
    });
  
    const mailOptions = {
      from: email,
      to: "fanousprod@gmail.com",
      subject: "New Contact Form Submission",
      text: `Deletion Reason: ${deletionReason}\nImprove Service: ${improveService}`,
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).send("Email sent successfully");
      }
    });
  }
  


  module.exports = {
    sendWelcomeEmail: sendWelcomeEmail,
  deletionEmail: deletionEmail,

 }