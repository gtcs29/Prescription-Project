const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
require('dotenv').load();

const verifyEmail = require('./verifyEmail');
const createUser = require('./create_user');
const verifyEmailCode = require('./verifyEmailCode');
const resetPasswordEmail = require('./resetPasswordEmail');

const welcomeEmail = require('./welcomeEmail');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://prescriptions-gtcs29.firebaseio.com"
});

exports.createUser = functions.https.onRequest(createUser);
exports.verifyEmail = functions.https.onRequest(verifyEmail);
exports.verifyEmailCode = functions.https.onRequest(verifyEmailCode);
exports.resetPasswordEmail = functions.https.onRequest(resetPasswordEmail);

exports.welcomeEmail = functions.https.onRequest(welcomeEmail);
