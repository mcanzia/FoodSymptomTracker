"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleAuthProvider = exports.storage = exports.auth = exports.db = void 0;
const app_1 = __importDefault(require("firebase/compat/app"));
require("firebase/compat/firestore");
require("firebase/compat/auth");
require("firebase/compat/storage");
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "crohns-food-tracker.firebaseapp.com",
    projectId: "crohns-food-tracker",
    storageBucket: "crohns-food-tracker.appspot.com",
    messagingSenderId: "214611572141",
    appId: "1:214611572141:web:9004ff3e3531e9f8ae5d24",
    measurementId: "G-0RV46C1JM5"
};
app_1.default.initializeApp(firebaseConfig);
exports.db = app_1.default.firestore();
exports.auth = app_1.default.auth();
exports.storage = app_1.default.storage();
exports.GoogleAuthProvider = new app_1.default.auth.GoogleAuthProvider();
