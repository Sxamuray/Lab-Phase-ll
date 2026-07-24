const nodemailer = require('nodemailer');

let transporter = null;

function getTransporter() {
  if (transporter) return transporter;

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  return transporter;
}

async function sendPasswordResetEmail({ to, resetUrl }) {
  const from = process.env.SMTP_FROM || 'HeroStream <noreply@herostream.app>';
  const subject = 'Reset your HeroStream password';
  const text = `You requested a password reset.\n\nOpen this link to set a new password:\n${resetUrl}\n\nThis link expires in 1 hour. If you did not request this, ignore this email.`;
  const html = `
    <div style="font-family:sans-serif;max-width:480px;margin:0 auto;">
      <h2 style="color:#e62429;">HeroStream</h2>
      <p>You requested a password reset.</p>
      <p><a href="${resetUrl}" style="display:inline-block;padding:12px 24px;background:#e62429;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Reset Password</a></p>
      <p style="color:#666;font-size:14px;">Or copy this link:<br><a href="${resetUrl}">${resetUrl}</a></p>
      <p style="color:#999;font-size:12px;">This link expires in 1 hour.</p>
    </div>
  `;

  const mail = getTransporter();
  if (!mail) {
    console.log('\n--- Password reset link (SMTP not configured) ---');
    console.log(`To: ${to}`);
    console.log(`Link: ${resetUrl}\n`);
    return { devMode: true };
  }

  await mail.sendMail({ from, to, subject, text, html });
  return { devMode: false };
}

module.exports = { sendPasswordResetEmail };
