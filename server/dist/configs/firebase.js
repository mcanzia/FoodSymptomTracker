"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testauth = exports.testdb = exports.firebaseAdmin = exports.db = void 0;
const app_1 = __importDefault(require("firebase/compat/app"));
require("firebase/compat/firestore");
require("firebase/compat/auth");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const serviceAccountKey_json_1 = __importDefault(require("./serviceAccountKey.json"));
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccountKey_json_1.default)
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
app_1.default.initializeApp(firebaseConfig);
exports.db = firebase_admin_1.default.firestore();
// export const documentId = firebase.firestore.FieldPath.documentId();
exports.firebaseAdmin = firebase_admin_1.default;
exports.testdb = app_1.default.firestore();
exports.testauth = app_1.default.auth();
