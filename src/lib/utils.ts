import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'bad47780a32f4a',
    pass: 'aee290a5a83646',
  },
});

export default async function sendEmail() {
  const mailOptions = {
    from: 'your_email@example.com',
    to: 'hasanmuzammil2812@gmail.com',
    subject: 'cronjobs',
    text: 'Check email sending',
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
  }
}