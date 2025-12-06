// server/src/utils/mailer.js
const nodemailer = require('nodemailer');

async function createTestTransporter() {
  const testAccount = await nodemailer.createTestAccount();
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: { user: testAccount.user, pass: testAccount.pass }
  });
  return { transporter, testAccount };
}

async function sendMail({ to, subject, text, html }) {
  try {
    const { transporter, testAccount } = await createTestTransporter();
    const info = await transporter.sendMail({
      from: `"Veridia Hiring" <${testAccount.user}>`,
      to,
      subject,
      text,
      html
    });
    // Returns preview URL for dev testing
    return nodemailer.getTestMessageUrl(info);
  } catch (error) {
    console.error("Mailer failed:", error.message);
    return null; 
  }
}

module.exports = { sendMail };