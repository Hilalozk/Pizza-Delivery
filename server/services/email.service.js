const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");
require("dotenv").config();

let transporter = nodemailer.createTransport({
  service: "Gmail",
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const registerEmail = async (userEmail, user) => {
  try {
    const emailToken = user.generateRegisterToken();
    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "Pizza Delivery",
        link: `${process.env.EMAIL_MAIL_URL}`
      }
    });

const email = {
    body:{
        name:userEmail,
        intro:'Welcome to the best Pizza Delivery! Happy to see you!',
        action:{
            instructions:"Click here to validate your account: ",
            button:{
                color:'#',
                text:'Validate your account',
                link:`${process.env.SITE_DOMAIN}verification?t=${emailToken}`
            }
        },
        outro: 'Need help, or have question? Just reply to this email, we will be happy to help!'
    }
}
//creating templete
let emailBody = mailGenerator.generate(email);
let message = {
  from: process.env.EMAIL,
  to:userEmail,
  subject:"Welcome to the best Pizza Delivery in town!",
  html:emailBody
};
//sending email
await transporter.sendMail(message);
return true

} catch (error) {
    throw error;
  }
};
module.exports = {
  registerEmail
}