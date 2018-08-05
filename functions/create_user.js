const admin = require('firebase-admin');

module.exports = function(req, res) {

  admin.auth().createUser({
    email: req.body.email,
    emailVerified: false,
    password: req.body.password,
    displayName: req.body.username,
    disabled: false
  })
  .then(user => res.send(user))
  .catch(err => res.status(422).send({ error: err }));
}
