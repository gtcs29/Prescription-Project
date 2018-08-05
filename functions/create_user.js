const admin = require('firebase-admin');

module.exports = function(req, res) {

  admin.auth().createUser({
    email: req.body.email,
    emailVerified: false,
    password: req.body.password,
    displayName: req.body.username,
    disabled: false
  })
  .then(userRecord => {
    admin.database().ref('users/' + userRecord.uid + '/auth/reset_password/')
      .update({ passwordReset: false }, () => {
        res.send({ success: true });
      });
  })
  .catch(err => res.status(422).send({ error: err }));
}
