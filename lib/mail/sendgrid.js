import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendResetPasswordEmail(email, code) {
  const msg = {
    to: email,
    from: 'your_verified_sendgrid_email@example.com', // must be verified in SendGrid
    subject: 'Password Reset Code',
    text: `PC COMMUNITY - EVENTS MANAGEMENT DIRECTION,

Your reset code is: ${code}

This code will expire in 1 hour.

If you didn't request this, ignore this email.`,
  };

  await sgMail.send(msg);
}
