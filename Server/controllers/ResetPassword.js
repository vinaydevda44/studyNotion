const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const passwordResetLinkTemplate = require("../mail/templates/passwordResetLink");
const passwordUpdatedTemplate = require("../mail/templates/passwordUpdate");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: `This Email: ${email} is not Registered With Us. Enter a Valid Email.`,
      });
    }

    const token = crypto.randomBytes(20).toString("hex");

    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        token,
        resetPasswordExpires: Date.now() + 3600000, // 1 hour
      },
      { new: true }
    );

    const url = `http://localhost:3000/update-password/${token}`;
    const html = passwordResetLinkTemplate(user.firstName || "User", url);

    await mailSender(email, "Password Reset Request", html);

    return res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error in resetPasswordToken:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while sending reset email",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (password !== confirmPassword) {
      return res.json({
        success: false,
        message: "Password and Confirm Password do not match",
      });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.json({
        success: false,
        message: "Token is invalid",
      });
    }

    if (user.resetPasswordExpires < Date.now()) {
      return res.json({
        success: false,
        message: "Token has expired. Please regenerate your token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token },
      {
        password: hashedPassword,
        token: undefined,
        resetPasswordExpires: undefined,
      },
      { new: true }
    );

    const html = passwordUpdatedTemplate(user.email, user.firstName || "User");

    await mailSender(user.email, "Password Updated Successfully", html);

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while resetting password",
    });
  }
};
