import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInAnonymously, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
console.log('help meee' + process.env.VITE_FIREBASE_CONFIG);
const firebaseConfig = JSON.parse(process.env.VITE_FIREBASE_CONFIG);
const firebaseApp = initializeApp(firebaseConfig);
let auth = getAuth(firebaseApp);
auth.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
auth.signInWithEmailAndPassword = signInWithEmailAndPassword;
auth.signInAnonymously = signInAnonymously;
auth.signInWithPopup = signInWithPopup;
auth.GoogleAuthProvider = GoogleAuthProvider;
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
export { auth, db, storage };
//# sourceMappingURL=firebase.js.map