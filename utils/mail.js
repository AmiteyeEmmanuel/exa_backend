import nodemailer from "nodemailer";

export const generateOTP = () => {
    let otp = ''
  for(let i = 0; i <= 3; i++){
     const randVal = Math.round(Math.random() * 9)
     otp = otp + randVal
  }
  return otp;
}

export const mailTransport = () =>  nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USERNAME,
          pass: process.env.MAILTRAP_PASSWORD
        }
      });


export const generateOTPTemp = code => {
  return `
  <!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body style="font-family: sans-serif;">
    <div style="display: block; margin: 0 auto; max-width: 600px; color: #272727;">
      <h1 style="font-size: 18px; font-weight: bold; text-align: center; background: #f6f6f6; padding: 10px; color:#272727;">Congrats for your Successful Registration!</h1>
      <p> Please Verify your Email to continue Your verification OTP code is</p>
      <p style = "width: 80px; margin: 0 auto; font-weight: bold; text-align: center; background: #f6f6f6; border-radius: 5px; font-size: 25px;">${code}</p>
      <p>Wish you all the best.</p>
    </div>
    <style>
      .main { background-color: white; }
      a:hover { border-left-width: 1em; min-height: 2em; }
    </style>
  </body>
</html>
  `
}




export const emailPlain = (heading, message) => {
  return `
  <!doctype html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body style="font-family: sans-serif;">
    <div style="display: block; margin: 0 auto; max-width: 600px; color: #272727;">
      <h1 style="font-size: 18px; font-weight: bold; text-align: center; background: #f6f6f6; padding: 10px; color:#272727;">${heading}</h1>
      <p style = "margin: 0 auto; font-weight: bold; text-align: center; color: #f6f6f6;">${message}</p>
    </div>
  </body>
</html>
  `
}


