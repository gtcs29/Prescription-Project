const admin = require('firebase-admin')
const sgMail = require('@sendgrid/mail');
// var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = function(req, res) {
  const email = req.body.email;
  const code = Math.floor((Math.random() * 8999 + 1000));
  const APP_NAME = 'MEDI-Files';
  admin.auth().getUserByEmail(email)
    .then(userRecord => {
      const displayName = userRecord.displayName;
      const uid = userRecord.uid;
      const msg = {
        to: email,
        from: 'gtcs29@gmail.com',
        subject: 'Verify Email',
        text: `Hey${displayName}! \nWelcome to ${APP_NAME}. \nYour email verification code is: ${code}`,
        html: `<p>Hey ${displayName}!</p> <p>Welcome to ${APP_NAME}.</p> <p>Your email verification code is: ${code}.</p>`,
      };
      sgMail.send(msg)
        .then(() => {
          admin.database().ref('users/' + uid + '/auth/verify_email/')
            .update({ code: code, codeValid: true }, () => {
              res.send({ success: true });
            });
        })
        .catch((err) => {
          return res.status(422).send({ error: err });
        })
    })
    .catch((err) => {
      res.status(422).send({ error: err });
    });

}
