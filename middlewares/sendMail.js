import nodemailer from 'nodemailer';

const sendMail = async (email,subject, otp)=> {
    
    const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465, //without cookie
        auth: {
          user: process.env.Gmail,
          pass: process.env.Password
        },
      });

    
    
    await transport.sendMail({
        from: process.env.Gmail,
        to: email,
        subject: subject,
        text: `Your OTP is ${otp}`,
    });
 
      
};

export default sendMail;