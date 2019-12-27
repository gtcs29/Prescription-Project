const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');
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
        subject: `Reset Password`,
        text: `Hey${displayName}! \nYour password has been reset. \nIf this is not you then please change your password immediately or contact us for further assistance.`,
        html: `<p>Hey ${displayName}!</p> <p>Your password has been reset.</p> <p>If this is not you then please change your password immediately or contact us for further assistance.</p>`,
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
