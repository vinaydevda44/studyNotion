const otpTemplate = (otp) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>OTP Verification Email</title>
    </head>
    <body style="background-color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
        <a href="https://studynotion-edtech-project.vercel.app">
          <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo" style="max-width: 200px; margin-bottom: 20px;" />
        </a>
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">OTP Verification Email</div>
        <div style="font-size: 16px; margin-bottom: 20px; text-align: left;">
          <p>Dear User,</p>
          <p>Thank you for registering with StudyNotion. To complete your registration, please use the following 
          One-Time Password (OTP) to verify your account:</p>
          <h2 style="font-weight: bold; text-align: center;">${otp}</h2>

          <div style="text-align: center; margin-top: 20px;">
            <a href="https://studynotion-edtech-project.vercel.app"
               style="display: inline-block; padding: 12px 24px; background-color: #FFD60A; color: #000000; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold;">
               Verify Now
            </a>
          </div>

          <p style="margin-top: 20px;">This OTP is valid for 5 minutes. If you did not request this verification, please disregard this email.</p>
          <p>Once your account is verified, you will have access to our platform and its features.</p>
        </div>
        <div style="font-size: 14px; color: #999999; margin-top: 20px;">
          If you have any questions or need assistance, please feel free to reach out to us at 
          <a href="mailto:info@studynotion.com" style="color: #999999;">info@studynotion.com</a>. We are here to help!
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = otpTemplate;
