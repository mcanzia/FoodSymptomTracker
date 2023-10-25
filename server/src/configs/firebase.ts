import admin, { ServiceAccount } from 'firebase-admin';
import serviceKey from './serviceAccountKey.json';

if (process.env.NODE_ENV === 'test') {
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  admin.initializeApp({
    projectId: 'crohns-food-tracker'
  });
} else {
  admin.initializeApp({
    credential: admin.credential.cert(serviceKey as ServiceAccount)
  });
}

export const db = admin.firestore();
export const firebaseAdmin = admin;