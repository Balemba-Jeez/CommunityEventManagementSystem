import nodemailer from 'nodemailer';

// Reusable transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail address
    pass: process.env.EMAIL_PASS, // your App Password (not your Gmail password)
  },
});

// For sending a verification code (e.g., signup or email verification)
export async function sendVerificationEmail(to, code) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Your Verification Code',
    text: `Your verification code is: ${code} It expires in 4 minutes`,
  };

  await transporter.sendMail(mailOptions);
}

// For sending a reset password code
export async function sendResetPasswordEmail(email, code) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Code',
    text: `PC COMMUNITY - EVENTS MANEGEMENT DIRECTION,

    You requested a password reset. 
    Your reset code is: ${code}

    This code will expire in 1 hour.

    If you didn't request this, you can safely ignore this email.`,
  };

  await transporter.sendMail(mailOptions);
}