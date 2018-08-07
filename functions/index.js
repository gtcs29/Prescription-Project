const functions = require('firebase-functions');
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccount.json');
require('dotenv').load();

const verifyEmail = require('./verifyEmail');
const verifyEmailCode = require('./verifyEmailCode');
const resetPassword = require('./resetPassword');
const resetPasswordEmail = require('./resetPasswordEmail');

const welcomeEmail = require('./welcomeEmail');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://prescriptions-gtcs29.firebaseio.com"
});

exports.verifyEmail = functions.https.onRequest(verifyEmail);
exports.verifyEmailCode = functions.https.onRequest(verifyEmailCode);
exports.resetPassword = functions.https.onRequest(resetPassword);
exports.resetPasswordEmail = functions.https.onRequest(resetPasswordEmail);

exports.welcomeEmail = functions.https.onRequest(welcomeEmail);
