import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
let firebaseConfig = {};
if (import.meta.env.VITE_FIREBASE_CONFIG) {
    firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);
}
else {
    firebaseConfig = {
        apiKey: "AIzaSyAjFwD4yxlxQhu-BH_s6GBkN4mmsk4wJkg",
        authDomain: "crohns-food-tracker.firebaseapp.com",
        projectId: "crohns-food-tracker",
        storageBucket: "crohns-food-tracker.appspot.com",
        messagingSenderId: "214611572141",
        appId: "1:214611572141:web:9004ff3e3531e9f8ae5d24",
        measurementId: "G-0RV46C1JM5"
    };
}
const firebaseApp = initializeApp(firebaseConfig);
let auth = getAuth(firebaseApp);
auth.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
auth.signInWithEmailAndPassword = signInWithEmailAndPassword;
auth.signInAnonymously = signInAnonymously;
auth.signInWithPopup = signInWithPopup;
auth.GoogleAuthProvider = GoogleAuthProvider;
auth.sendPasswordResetEmail = sendPasswordResetEmail;
let db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
export { auth, db, doc, getDoc, storage };
//# sourceMappingURL=firebase.js.map