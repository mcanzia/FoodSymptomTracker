import { firebaseAdmin } from "../configs/firebase";
export class AuthService {

    static async validateAuthToken(bearer : any) {
        if (!bearer || !bearer.startsWith("Bearer ")) {
            throw new Error();
        }
        const [_, userAuthToken] = bearer.trim().split(" ");
        if (!userAuthToken) {
            throw new Error();
        }
        try {
            const userDetails = await firebaseAdmin.auth().verifyIdToken(userAuthToken);
            return userDetails.uid;
        } catch (error) {
            throw new Error();
        }
    }
}