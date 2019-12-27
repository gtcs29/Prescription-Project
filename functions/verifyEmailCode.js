const admin = require('firebase-admin');

module.exports = function(req, res) {
  const code = parseInt(req.body.code);
  admin.auth().getUserByEmail(req.body.email)
    .then(userRecord => {
      var uid = userRecord.uid;
      var db = admin.firestore();
      db.collection('users').doc(uid).collection('auth').doc('verify_email').get()
        .then((doc) => {
          data = doc.data();
          if (!data.codeValid || parseInt(data.code) !== code){
            return res.status(422).send({ error: 'Code not valid' });
          }
          else{
            admin.auth().updateUser(uid, { emailVerified: true });
            db.collection('users').doc(uid).collection('auth').doc('verify_email').set({
              codeValid: false
            })
              .then(() => {
                return res.status(200).send({success: 'Succ'});
              })
              .catch((err) => {return res.status(422).send({ error: '3',err }) });
          }
        })
        .catch((err) => {return res.status(422).send({ error: '1',err }) });
    })
    .catch((err) => {return res.status(422).send({ error: '4',err }) });
};
