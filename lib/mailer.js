import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // your App Password (not your Gmail password)
  },
});

export async function sendVerificationEmail(to, code) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${code} It expires in 4 minutes`,
  };

  await transporter.sendMail(mailOptions);
}
