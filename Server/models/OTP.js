const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender');
const otpTemplate = require('../mail/templates/emailVerificationTemplate');  

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 5 * 60, // expires in 5 minutes
  },
});

// send styled email
async function sendVerificationEmail(email, otp) {
  try {
    const htmlBody = otpTemplate(otp);  
    const mailResponse = await mailSender(email, "Verification Email from StudyNotion", htmlBody);
    console.log("Email sent successfully:", mailResponse);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
}

// pre-save hook
OTPSchema.pre("save", async function (next) {
  if (this.isNew) {
    await sendVerificationEmail(this.email, this.otp);
  }
  next();
});

module.exports = mongoose.model("OTP", OTPSchema);  
