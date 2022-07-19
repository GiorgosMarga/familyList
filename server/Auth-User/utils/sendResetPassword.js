const nodemailer = require("nodemailer");

const sendResetPasswordEmail = async ({username,email,origin,passwordResetToken}) => {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'elsie.goyette32@ethereal.email',
        pass: 'NvztnmsVWygaCVaGks'
    }
  }); 
  const verifyLink = `${origin}/resetPassword.html?token=${passwordResetToken}&email=${email}`;
  const message = `<p>Please click the following link to reset your password: 
  <a href="${verifyLink}">Reset Password</a></p>`
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"familyList" <noreply@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Reset your password!", // Subject line
    html: `<h4>Hello, ${username}</h4>
    ${message}`, // html body
  });

}

module.exports =  sendResetPasswordEmail