import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import admin, { ServiceAccount } from 'firebase-admin';
import serviceKey from './serviceAccountKey.json';

admin.initializeApp({
  credential: admin.credential.cert(serviceKey as ServiceAccount)
});

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    authDomain: "crohns-food-tracker.firebaseapp.com",
    projectId: "crohns-food-tracker",
    storageBucket: "crohns-food-tracker.appspot.com",
    messagingSenderId: "214611572141",
    appId: "1:214611572141:web:9004ff3e3531e9f8ae5d24",
    measurementId: "G-0RV46C1JM5"
  };

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const documentId = firebase.firestore.FieldPath.documentId();
export const auth = firebase.auth();
export const storage = firebase.storage();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firebaseAdmin = admin;