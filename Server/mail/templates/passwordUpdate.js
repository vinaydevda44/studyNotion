// mail/templates/passwordUpdate.js

module.exports = function passwordUpdated(email, name) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Password Update Confirmation</title>
  </head>
  <body style="background-color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
          <a href="https://studynotion-edtech-project.vercel.app">
              <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion logo" style="max-width: 200px; margin-bottom: 20px;" />
          </a>
          <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">Password Update Confirmation</div>
          <div style="font-size: 16px; margin-bottom: 20px; text-align: left;">
              <p>Hey ${name},</p>
              <p>Your password has been successfully updated for the email <span style="font-weight: bold;">${email}</span>.</p>
              <p>If you did not request this password change, please contact us immediately to secure your account.</p>
          </div>
          <div style="font-size: 14px; color: #999999; margin-top: 20px; text-align: left;">
              <p>If you have any questions or need further assistance, please feel free to reach out at 
                  <a href="mailto:info@studynotion.com" style="color: #999999;">info@studynotion.com</a>. We are here to help!
              </p>
          </div>
      </div>
  </body>
  </html>
  `;
};
