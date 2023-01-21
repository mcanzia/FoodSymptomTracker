"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const firebase_1 = require("../configs/firebase");
class AuthService {
    static async validateAuthToken(bearer) {
        if (!bearer || !bearer.startsWith("Bearer ")) {
            throw new Error();
        }
        const [_, userAuthToken] = bearer.trim().split(" ");
        if (!userAuthToken) {
            throw new Error();
        }
        try {
            const userDetails = await firebase_1.firebaseAdmin.auth().verifyIdToken(userAuthToken);
            return userDetails.uid;
        }
        catch (error) {
            throw new Error();
        }
    }
}
exports.AuthService = AuthService;
