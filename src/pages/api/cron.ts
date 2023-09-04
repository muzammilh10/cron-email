// import sendEmail from "@/lib/utils";
// import {NextApiRequest, NextApiResponse} from "next";


// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse,
// ) {

//     sendEmail()

//     res.status(200).json(`results`);
// }

import nodemailer from 'nodemailer';
import { VercelRequest, VercelResponse } from '@vercel/node';

const transporter = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'bad47780a32f4a',
    pass: 'aee290a5a83646',
  },
});

async function sendEmail() {
  const mailOptions = {
    from: 'your_email@example.com',
    to: 'hasanmuzammil2812@gmail.com',
    subject: 'cronjobs',
    text: 'Check email sending',
  };

  try {
    console.log('Email sent successfully');
    return  transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

export default async function handler(req : VercelRequest,res:VercelResponse){
  if(req.method === 'POST'){
    const emailRes = await sendEmail()
    if(emailRes?.messageId){
      return res.status(200).json({message : 'email send successfully'})
    }
    return res.status(400).json({ message: 'Error sending email' });
  }
  if(req.method === 'GET'){
    const emailRes = await sendEmail()
    if(emailRes?.messageId){
      return res.status(200).json({message : 'email send successfully'})
    }
    return res.status(400).json({ message: 'Error sending email' });
  }
  return res.status(400).json({ message: `Incorrect method: ${req.method}. Did you mean POST?` });
}