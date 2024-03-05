const { initializeApp } = require("firebase/app");
const { getAnalytics } = require("firebase/analytics");
const { getStorage, getDownloadURL, uploadBytesResumable, ref } = require('firebase/storage');
require('dotenv').config();

const firebaseConfig = {
    apiKey: process.env.FIREBASEAPIKEY,
    authDomain: process.env.FIREBASEAUTHDOMAIN,
    projectId: process.env.FIREBASEPROJECTID,
    storageBucket: process.env.FIREBASESOTRAGEBUCKET,
    messagingSenderId: process.env.FIREBASEMESSAGINGSENDERID,
    appId: process.env.FIREABASEAPPID,
    measurementId: process.env.FIREBASEMEASUREMENTID,
    storageBucket:process.env.FIREBASESTORAGEBUCEKT
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseStorage = getStorage(firebaseApp, 'gs://newone-14602.appspot.com');
  
  
  module.exports = {firebaseStorage}