const firebase = require("firebase");

var firebaseConfig = {
    apiKey: process.env.ApiKey,
    authDomain: process.env.AuthDomain,
    databaseURL: "https://cubic-database.firebaseio.com",
    projectId: process.env.ProjectId,
    storageBucket: process.env.storageBucket,
    messagingSenderId: process.env.MessagingSenderId,
    appId: process.env.AppId,
    measurementId: process.env.MeasurementId
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database()

console.log(` _____________________________________________________________________________`)
console.log('|                                                                             |')
console.log(`| A database atual FIREBASE foi iniciada com sucesso, já disponivel para uso. |`)
console.log(`|_____________________________________________________________________________|`)

module.exports = { database }