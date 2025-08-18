import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendResetPasswordEmail(email, code) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Password Reset Code',
    text: `PC COMMUNITY - EVENTS MANEGEMENT DIRECTION,

    You requested a password reset. 
    Your reset code is: ${code}

    If you didn't request this, you can safely ignore this email.`,
  });
}

export async function sendVerificationEmail(email, code) {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Email Verification Code',
    text: `PC COMMUNITY - EVENTS MANAGEMENT DIRECTION

  You recently requested to verify your email.
  Your verification code is: ${code}

  If you did not request this, please ignore this email.`
  });
}
