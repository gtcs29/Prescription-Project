const admin = require('firebase-admin')
const sgMail = require('@sendgrid/mail');
// var apiKey = Environment.GetEnvironmentVariable("SENDGRID_API_KEY");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = function(req, res) {
  const APP_NAME = 'MEDI-Files';
  admin.auth().getUser(req.body.uid)
    .then(userRecord => {
      const displayName = userRecord.displayName;
      const email = userRecord.email;
      const msg = {
        to: email,
        from: 'gtcs29@gmail.com',
        subject: `Welcome ${displayName}`,
        text: `Hey${displayName}! \nWelcome to ${APP_NAME}. \nHope you have a nice time using our app. \nDo let us know how we can improve your experience by replying to this email. Please remove this email from your spam if it goes there automatically.`,
        html: `<p>Hey ${displayName}!</p> <p>Welcome to ${APP_NAME}.</p> <p>Hope you have a nice time using our app.</p> <p>Do let us know how we can improve your experience by replying to this email. Please remove this email from your spam if it goes there automatically.</p>`,
      };
      sgMail.send(msg)
        .then(() => {
          res.send({ success: true })
        })
        .catch((err) => {
          return res.status(422).send({ error: err });
        })
    })
    .catch((err) => {
      res.status(422).send({ error: err });
    });

}
