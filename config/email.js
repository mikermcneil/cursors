module.exports = {
  email: {
    auth: {
      user: 'sailsjs.dev@gmail.com',
      pass: 'rabb1tparty'
    }
//     service ((string))  A "well-known service" that Nodemailer knows how to communicate with (see this list of services)
// auth  ((object))  Authentication object as {user:"...", pass:"..."}
// templateDir ((string))  Path to view templates (defaults to ../../views/emailTemplates)
// from  ((string))  Default from email address
// testMode  ((boolean)) Flag indicating whether the hook is in "test mode". In test mode, email options and contents are written to a .tmp/email.txt file instead of being actually sent. Defaults to true.
// alwaysSendTo  ((string))  If set, all emails will be sent to this address regardless of the to option specified. Good for testing live emails without worrying about accidentally spamming people.
  }
};
