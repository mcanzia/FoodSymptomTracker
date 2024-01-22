import { initializeApp } from 'firebase/app';
import { Auth, getAuth, GoogleAuthProvider, 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signInAnonymously, signInWithPopup} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAjFwD4yxlxQhu-BH_s6GBkN4mmsk4wJkg",
  authDomain: "crohns-food-tracker.firebaseapp.com",
  projectId: "crohns-food-tracker",
  storageBucket: "crohns-food-tracker.appspot.com",
  messagingSenderId: "214611572141",
  appId: "1:214611572141:web:9004ff3e3531e9f8ae5d24",
  measurementId: "G-0RV46C1JM5"
};

const firebaseApp = initializeApp(firebaseConfig);

interface AuthFunctions extends Auth {
  createUserWithEmailAndPassword: any;
  signInWithEmailAndPassword: any;
  signInAnonymously: any;
  signInWithPopup: any;
  GoogleAuthProvider: any;
}

let auth = getAuth(firebaseApp) as AuthFunctions;
auth.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
auth.signInWithEmailAndPassword = signInWithEmailAndPassword;
auth.signInAnonymously = signInAnonymously;
auth.signInWithPopup = signInWithPopup;
auth.GoogleAuthProvider = GoogleAuthProvider;

const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export {auth, db, storage};