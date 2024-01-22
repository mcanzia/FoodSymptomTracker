import { initializeApp } from 'firebase/app';
import { Auth, getAuth, GoogleAuthProvider, 
  createUserWithEmailAndPassword, signInWithEmailAndPassword, 
  signInAnonymously, signInWithPopup} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

console.log(import.meta.env.VITE_FIREBASE_CONFIG);
const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

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