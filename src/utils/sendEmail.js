const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USERNAME,
    pass: process.env.SMTP_PASSWORD
  }
});

sendEmail = (content, receiver, subject) => {
  const message = {
    from: process.env.FROM_EMAIL,
    to: receiver,
    subject,
    html: content
  };
  transport.sendMail(message, function(err, info) {
    if (err) {
      throw new Error(err.message);
    } else {
    }
  });
};

module.exports = sendEmail;
