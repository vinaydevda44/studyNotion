const paymentSuccessEmail = (name, amount, orderId, paymentId) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Payment Confirmation</title>
    </head>
    <body style="background-color: #ffffff; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.4; color: #333333; margin: 0; padding: 0;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px; text-align: center;">
        <a href="https://studynotion-edtech-project.vercel.app">
          <img src="https://i.ibb.co/7Xyj3PC/logo.png" alt="StudyNotion Logo" style="max-width: 200px; margin-bottom: 20px;" />
        </a>
        <div style="font-size: 18px; font-weight: bold; margin-bottom: 20px;">Course Payment Confirmation</div>
        <div style="font-size: 16px; margin-bottom: 20px; text-align: left;">
          <p>Dear ${name},</p>
          <p>We have successfully received your payment of <strong>₹${amount}</strong>.</p>
          <p><strong>Payment ID:</strong> ${paymentId}</p>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p>Thank you for your purchase. We’re excited to have you on board!</p>
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

module.exports = paymentSuccessEmail;
