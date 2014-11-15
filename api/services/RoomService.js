module.exports = {
  sendEmail: function (options, cb){

    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'sailsjs.dev@gmail.com',
        pass: 'rabb1tparty'
      }
    });

    // setup e-mail data with unicode symbols
    var mailOptions = {
      from: options.fullName + ' ✔ <'+options.email+'>', // sender address
      to: 'mike@balderdash.co', // list of receivers
      subject: 'Hello ✔', // Subject line
      text: 'Hello world ✔', // plaintext body
      html: '<b>Hello world ✔</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, cb);
  }
};
