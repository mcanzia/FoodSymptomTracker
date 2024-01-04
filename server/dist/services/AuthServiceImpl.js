"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServiceImpl = void 0;
const firebase_1 = require("../configs/firebase");
const CustomError_1 = require("../util/error/CustomError");
class AuthServiceImpl {
    static async validateAuthToken(bearer) {
        if (!bearer || !bearer.startsWith("Bearer ")) {
            throw new CustomError_1.AuthorizationError("Error occurred while attempting to authorize user.");
        }
        const [_, userAuthToken] = bearer.trim().split(" ");
        if (!userAuthToken) {
            throw new CustomError_1.AuthorizationError("Error occurred while attempting to authorize user.");
        }
        try {
            const userDetails = await firebase_1.firebaseAdmin.auth().verifyIdToken(userAuthToken);
            return userDetails.uid;
        }
        catch (error) {
            throw new CustomError_1.AuthorizationError("User is not authorized: " + error);
        }
    }
}
exports.AuthServiceImpl = AuthServiceImpl;
