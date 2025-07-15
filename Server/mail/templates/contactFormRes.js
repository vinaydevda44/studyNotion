const contactUsEmail = (email, firstname, lastname, message, phoneNo, countrycode) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Contact Form Confirmation</title>
    </head>
    <body style="background-color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
        <a href="https://studynotion-edtech-project.vercel.app">
          <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo" style="max-width: 200px; margin-bottom: 20px;" />
        </a>
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">Contact Form Confirmation</div>
        <div style="font-size: 16px; margin-bottom: 20px; text-align: left;">
          <p>Dear ${firstname} ${lastname},</p>
          <p>Thank you for contacting us. We have received your message and will respond to you as soon as possible.</p>
          <p>Here are the details you provided:</p>
          <ul style="list-style: none; padding: 0;">
            <li><strong>Name:</strong> ${firstname} ${lastname}</li>
            <li><strong>Email:</strong> ${email}</li>
            <li><strong>Phone Number:</strong> +${countrycode} ${phoneNo}</li>
            <li><strong>Message:</strong> ${message}</li>
          </ul>
          <p>We appreciate your interest and will get back to you shortly.</p>
        </div>
        <div style="font-size: 14px; color: #999999; margin-top: 20px;">
          If you have any further questions or need immediate assistance, please feel free to reach out to us at 
          <a href="mailto:info@studynotion.com" style="color: #999999;">info@studynotion.com</a>. We are here to help!
        </div>
      </div>
    </body>
    </html>
  `;
};

module.exports = contactUsEmail;
