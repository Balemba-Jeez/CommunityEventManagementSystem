import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendResetPasswordEmail(email, code) {
  const msg = {
    to: email,
    from: 'pccommunityevents@gmail.com',
    subject: 'Password Reset Code',
    text: `PC Community - Events Team,

Your reset code is: ${code}

This code will expire in 1 hour.

If you didn't request this, ignore this email.`,
  };

  await sgMail.send(msg);
}



export async function sendVerificationEmail(email, code, expireHours = 1) {
  try {
    const msg = {
      to: email,
      from: 'pccommunityevents@gmail.com',
      subject: 'PC COMMUNITY - Email Verification Code',
      text: `PC COMMUNITY - Events Team

      You recently requested to verify your email.
      Your verification code is: ${code}

      This code will expire in ${expireHours} hour(s).

      If you did not request this, please ignore this email.`,
            html: `
              <div style="font-family: Arial, sans-serif; line-height:1.5; color: #333;">
                <h2>PC COMMUNITY - Events Team</h2>
                <p>You recently requested to verify your email.</p>
                <p>Your verification code is: <strong>${code}</strong></p>
                <p>This code will expire in <strong>${expireHours} hour(s)</strong>.</p>
                <p>If you did not request this, you can safely ignore this email.</p>
              </div>
            `,
          };

          await sgMail.send(msg);
          console.log(`Verification email sent to ${email}`);
        } catch (err) {
          console.error('SendGrid error:', err.response?.body || err);
          throw new Error('Failed to send verification email');
        }
}

export async function resendVerificationEmail(email, code, expireHours = 1) {
  try {
    const msg = {
      to: email,
      from: 'pccommunityevents@gmail.com',
      subject: 'PC COMMUNITY - Resend Email Verification Code',
      text: `PC COMMUNITY - Events Team

      You requested to resend your email verification code.
      Your new verification code is: ${code}

      This code will expire in ${expireHours} hour(s).

      If you did not request this, please ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height:1.5; color: #333;">
          <h2>PC COMMUNITY - Events Team</h2>
          <p>You requested to resend your email verification code.</p>
          <p>Your new verification code is: <strong>${code}</strong></p>
          <p>This code will expire in <strong>${expireHours} hour(s)</strong>.</p>
          <p>If you did not request this, you can safely ignore this email.</p>
        </div>
      `,
    };

    await sgMail.send(msg);
    console.log(`Resend verification email sent to ${email}`);
  } catch (err) {
    console.error('SendGrid error (resend):', err.response?.body || err);
    throw new Error('Failed to send resend verification email');
  }
}