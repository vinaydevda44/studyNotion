exports.courseEnrollmentEmail = (courseName, name) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Course Registration Confirmation</title>
  </head>
  <body style="background-color:#ffffff; font-family:Arial, sans-serif; font-size:16px; line-height:1.4; color:#333333; margin:0; padding:0;">
      <div style="max-width:600px; margin:0 auto; padding:20px; text-align:center;">
          <a href="https://studynotion-edtech-project.vercel.app">
              <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion logo" style="max-width:200px; margin-bottom:20px;" />
          </a>
          <div style="font-size:18px; font-weight:bold; margin-bottom:20px;">Course Registration Confirmation</div>
          <div style="font-size:16px; margin-bottom:20px;">
              <p>Hey ${name},</p>
              <p>You have successfully enrolled in <span style="font-weight:bold;">${courseName}</span> course.</p>
              <p>Start learning now by clicking the button below.</p>
              <a href="https://studynotion-edtech-project.vercel.app"
                 style="display:inline-block; padding:10px 20px; background-color:#FFD60A; color:#000000; text-decoration:none; border-radius:5px; font-size:16px; font-weight:bold; margin-top:20px;">
                 Start learning
              </a>
          </div>
          <div style="font-size:14px; color:#999999; margin-top:20px;">
              If you have any questions or need assistance, please feel free to reach out to us at
              <a href="mailto:info@studynotion.com" style="color:#999999;">info@studynotion.com</a>. We are here to help!
          </div>
      </div>
  </body>
  </html>`;
};
