// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyCQF6LronSKbe3kJ8FScd4CV5dQPQhmR5A",

    authDomain: "bookshelf-22cfa.firebaseapp.com",

    projectId: "bookshelf-22cfa",

    storageBucket: "bookshelf-22cfa.appspot.com",

    messagingSenderId: "421842491724",

    appId: "1:421842491724:web:a0630bdaf49f2d334b17e9"

};


// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export default firebase;