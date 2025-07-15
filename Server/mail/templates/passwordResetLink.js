// mail/templates/passwordResetLink.js

module.exports = function passwordResetLinkTemplate(name, url) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset</title>
  </head>
  <body style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
    <div style="max-width: 600px; margin: auto; text-align: center;">
      <a href="https://studynotion-edtech-project.vercel.app">
        <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion logo" style="max-width: 200px; margin-bottom: 20px;" />
      </a>
      <h2>Password Reset Request</h2>
      <p>Hello ${name},</p>
      <p>We received a request to reset your password.</p>
      <p>Click the button below to reset your password:</p>
      <a href="${url}" style="display: inline-block; padding: 10px 20px; background-color: #FFD60A; color: #000; text-decoration: none; border-radius: 5px; font-weight: bold;">Reset Password</a>
      <p>Or paste this link in your browser: <br/> <a href="${url}">${url}</a></p>
      <p>If you did not request this, you can safely ignore it.</p>
      <p>Thanks, <br/> StudyNotion Team</p>
    </div>
  </body>
  </html>
  `;
};

