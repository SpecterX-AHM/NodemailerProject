//NODEJS SERVER
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;

//Transporter object
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
      clientId: process.env.OAUTH_CLIENTID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
  });

//mailOptions object
let mailOptions = {
    from: 'sender@gmail.com',
    to: 'receiver@gmail.com',
    subject: 'NodemailerProject',
    text: 'Hi! I\'m your nodemailer project'
  };

//sendMail method
transporter.sendMail(mailOptions, function(err, data) {
    if(err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully");
    }
  });


app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`)
});
