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
  databaseURL: "https://smartest-df9af.firebaseio.com"
});

exports.verifyEmail = functions.https.onRequest(verifyEmail);
exports.verifyEmailCode = functions.https.onRequest(verifyEmailCode);
exports.resetPassword = functions.https.onRequest(resetPassword);
exports.resetPasswordEmail = functions.https.onRequest(resetPasswordEmail);

exports.welcomeEmail = functions.https.onRequest(welcomeEmail);

// exports.databaseOnChange = functions.database.ref('/users/{userId}/data/Prescriptions/{prescription}/')
//   .onCreate((snapshot, context) => {
//     var userId = context.params.userId
//     return admin.database().ref(`/users/${userId}/sorted/sorted1`).set(snapshot.val());
//   });

// exports.databaseOnChange = functions.database.ref('/users/{userId}/data/Prescriptions/{prescriptionId}/')
//   .onCreate((snapshot, context) => {
//     var userId = context.params.userId;
//     var prescriptionId = context.params.prescriptionId;
//     var prescription = snapshot.val();
//     var updates = {};
//
//     if(prescription["appointments"] != undefined || prescription["appointments"] != null){
//       var appointmentsList = prescription["appointments"];
//       for(var i=0; i<appointmentsList.length; i++){
//         var key = admin.database().ref(`/users/${userId}/sorted/appointments/`).push().key;
//         appointmentsList[i]['prescriptionId'] = prescriptionId;
//         updates[`/users/${userId}/sorted/appointments/${key}`] = appointmentsList[i];
//       }
//     }
//
//     if(prescription["date"] != undefined || prescription["date"] != null){
//       var date = prescription["date"];
//       var dateList = {};
//       var key = admin.database().ref(`/users/${userId}/sorted/date/`).push().key;
//       dateList['prescriptionId'] = prescriptionId;
//       dateList['date'] = date;
//       updates[`/users/${userId}/sorted/date/${key}`] = dateList;
//     }
//
//     if(prescription["diagnosis"] != undefined || prescription["diagnosis"] != null){
//       var diagnosisList = prescription["diagnosis"];
//       for(var i=0; i<diagnosisList.length; i++){
//         var key = admin.database().ref(`/users/${userId}/sorted/diagnosis/`).push().key;
//         diagnosisList[i]['prescriptionId'] = prescriptionId;
//         updates[`/users/${userId}/sorted/appointments/${key}`] = diagnosisList[i];
//       }
//     }
//
//     if(prescription["docName"] != undefined || prescription["docName"] != null || prescription["docName"].length != 0){
//       var docName = prescription["docName"]
//       var docNameList = {};
//       var key = admin.database().ref(`/users/${userId}/sorted/docName/`).push().key;
//       docNameList['prescriptionId'] = prescriptionId;
//       docNameList['docName'] = docName;
//       updates[`/users/${userId}/sorted/docName/${key}`] = docNameList;
//     }
//
//     if(prescription["medicines"] != undefined || prescription["medicines"] != null){
//       var medicinesList = prescription["medicines"];
//       for(var i=0; i<medicinesList.length; i++){
//         var key = admin.database().ref(`/users/${userId}/sorted/medicines/`).push().key;
//         medicinesList[i]['prescriptionId'] = prescriptionId;
//         updates[`/users/${userId}/sorted/medicines/${key}`] = medicinesList[i];
//       }
//     }
//
//     if(prescription["patientName"] != undefined || prescription["patientName"] != null || prescription["patientName"].length != 0){
//       var patientName = prescription["patientName"];
//       var patientNameList = {};
//       var key = admin.database().ref(`/users/${userId}/sorted/patientName/`).push().key;
//       patientNameList['prescriptionId'] = prescriptionId;
//       patientNameList['patientName'] = patientName;
//       updates[`/users/${userId}/sorted/patientName/${key}`] = patientNameList;
//     }
//
//     if(prescription["testResultsList"] != undefined || prescription["testResultsList"] != null){
//       var testResultsList = prescription["testResultsList"];
//       for(var i=0; i<testResultsList.length; i++){
//         var key = admin.database().ref(`/users/${userId}/sorted/testResults/`).push().key;
//         testResults[i]['prescriptionId'] = prescriptionId;
//         updates[`/users/${userId}/sorted/testResults/${key}`] = testResultsList[i];
//       }
//     }
//
//     return admin.database().ref().update(updates);
//   });





exports.appointmentsWrite= functions.database.ref('/users/{userId}/data/Prescriptions/{prescriptionId}/appointments')
  .onWrite((change, context) => {
    var userId = context.params.userId;
    var prescriptionId = context.params.prescriptionId;
    var appointmentsList = change.after.val();
    var updates = {};
    for(var i=0; i<appointmentsList.length; i++){
      var key = admin.database().ref(`/users/${userId}/sorted/appointments/`).push().key;
      appointmentsList[i]['prescriptionId'] = prescriptionId;
      updates[`/users/${userId}/sorted/appointments/${key}`] = appointmentsList[i];
    }
    return admin.database().ref().update(updates);
  });

exports.dateWrite= functions.database.ref('/users/{userId}/data/Prescriptions/{prescriptionId}/date')
  .onWrite((change, context) => {
    var userId = context.params.userId;
    var prescriptionId = context.params.prescriptionId;
    var date = change.after.val();
    var updates = {};
    var dateList = {};
    var key = admin.database().ref(`/users/${userId}/sorted/date/`).push().key;
    dateList['prescriptionId'] = prescriptionId;
    dateList['date'] = date;
    updates[`/users/${userId}/sorted/date/${key}`] = dateList;
    return admin.database().ref().update(updates);
  });

exports.diagnosisWrite= functions.database.ref('/users/{userId}/data/Prescriptions/{prescriptionId}/diagnosis')
  .onWrite((change, context) => {
    var userId = context.params.userId;
    var prescriptionId = context.params.prescriptionId;
    var diagnosisList = change.after.val();
    var updates = {};
    for(var i=0; i<diagnosisList.length; i++){
      var key = admin.database().ref(`/users/${userId}/sorted/diagnosis/`).push().key;
      diagnosisList[i]['prescriptionId'] = prescriptionId;
      updates[`/users/${userId}/sorted/appointments/${key}`] = diagnosisList[i];
    }
    return admin.database().ref().update(updates);
  });

exports.docNameWrite= functions.database.ref('/users/{userId}/data/Prescriptions/{prescriptionId}/docName')
  .onWrite((change, context) => {
    var userId = context.params.userId;
    var prescriptionId = context.params.prescriptionId;
    var updates = {};
    if(!change.after.val()){
      var data = admin.database().ref(`/users/${userId}/sorted/docName/`).orderByChild('prescriptionId').equalTo(prescriptionId)
      updates[`/users/${userId}/sorted/docName/123`] = "data";
    }
    else {
      var docName = change.after.val();
      var docNameList = {};
      docNameList['prescriptionId'] = prescriptionId;
      docNameList['docName'] = docName;
      var key = admin.database().ref(`/users/${userId}/sorted/docName/`).push().key;
      updates[`/users/${userId}/sorted/docName/${key}`] = docNameList;
      // admin.database.ref(`/users/${userId}/sorted/docName/`).orderByChild('prescriptionId').equalTo(prescriptionId).once('value', function(snapshot) {
      //   if(snapshot.exists()) {
      //     var key = snapshot.key
      //     updates[`/users/${userId}/sorted/docName/${key}`] = docNameList;
      //   }
      //   else {
      //     var key = admin.database().ref(`/users/${userId}/sorted/docName/`).push().key;
      //     updates[`/users/${userId}/sorted/docName/${key}`] = docNameList;
      //   }
      // })
    }

    return admin.database().ref().update(updates);
  });

exports.medicinesWrite= functions.database.ref('/users/{userId}/data/Prescriptions/{prescriptionId}/medicines')
  .onWrite((change, context) => {
    var userId = context.params.userId;
    var prescriptionId = context.params.prescriptionId;
    var medicinesList = change.after.val();
    var updates = {};
    for(var i=0; i<medicinesList.length; i++){
      var key = admin.database().ref(`/users/${userId}/sorted/medicines/`).push().key;
      medicinesList[i]['prescriptionId'] = prescriptionId;
      updates[`/users/${userId}/sorted/medicines/${key}`] = medicinesList[i];
    }
    return admin.database().ref().update(updates);
  });

exports.patientNameWrite= functions.database.ref('/users/{userId}/data/Prescriptions/{prescriptionId}/patientName')
  .onWrite((change, context) => {
    var userId = context.params.userId;
    var prescriptionId = context.params.prescriptionId;
    var patientName = change.after.val();
    var updates = {};
    var patientNameList = {};
    var key = admin.database().ref(`/users/${userId}/sorted/patientName/`).push().key;
    patientNameList['prescriptionId'] = prescriptionId;
    patientNameList['patientName'] = patientName;
    updates[`/users/${userId}/sorted/patientName/${key}`] = patientNameList;
    return admin.database().ref().update(updates);
  });

exports.testResultsWrite= functions.database.ref('/users/{userId}/data/Prescriptions/{prescriptionId}/testResults')
  .onWrite((change, context) => {
    var userId = context.params.userId;
    var prescriptionId = context.params.prescriptionId;
    var testResultsList = change.after.val();
    var updates = {};
    for(var i=0; i<testResultsList.length; i++){
      var key = admin.database().ref(`/users/${userId}/sorted/testResults/`).push().key;
      testResultsList[i]['prescriptionId'] = prescriptionId;
      updates[`/users/${userId}/sorted/testResults/${key}`] = testResultsList[i];
    }
    return admin.database().ref().update(updates);
  });

exports.reminderWrite= functions.database.ref('/users/{userId}/data/Prescriptions/{prescriptionId}/reminders')
  .onWrite((change, context) => {
    var userId = context.params.userId;
    var prescriptionId = context.params.prescriptionId;
    var remindersList = change.after.val();
    var updates = {};
    for(var i=0; i<remindersList.length; i++){
      var key = admin.database().ref(`/users/${userId}/sorted/reminders/`).push().key;
      remindersList[i]['prescriptionId'] = prescriptionId;
      updates[`/users/${userId}/sorted/reminders/${key}`] = remindersList[i];
    }
    return admin.database().ref().update(updates);
  });
