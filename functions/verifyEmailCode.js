const admin = require('firebase-admin');

module.exports = function(req, res) {

  const code = parseInt(req.body.code);

  admin.auth().getUserByEmail(req.body.email)
    .then(userRecord => {
      const ref = admin.database().ref('users/' + userRecord.uid + '/verify_email/');
      ref.on('value', snapshot => {
        ref.off();
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: 'Code not valid' });
        }
        admin.auth().updateUser(userRecord.uid, { emailVerified: true })
        ref.update({ codeValid: false });
        admin.auth().createCustomToken(userRecord.uid)
          .then(token => res.send({ token: token }));
      });
    })
    .catch((err) => res.status(422).send({ error: err }))
}
