const nodemailer = require("nodemailer");

const sendVerificationEmail = async ({username,email,origin,emailVeriificationToken}) => {
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
  const verifyLink = `${origin}/auth/verify-email?token=${emailVeriificationToken}&email=${email}`;
  const message = `<p>Please verify your email by clicking the following link: 
  <a href="${verifyLink}">Verify Email</a></p>`
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"familyList" <noreply@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Verify your email!", // Subject line
    html: `<h4>Hello, ${username}</h4>
    ${message}`, // html body
  });

}

module.exports =  sendVerificationEmail