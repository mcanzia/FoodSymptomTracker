import { defineStore } from 'pinia';
import { auth, db } from '../firebase';
import { ErrorHandler } from '../util/error/ErrorHandler';
import { useComponentStore } from './componentStore';
export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        isLoading: false,
    }),
    getters: {
        isLoggedIn: (state) => state.user !== null
    },
    actions: {
        async initalizeAuthListener() {
            this.isLoading = true;
            await auth.onAuthStateChanged(authUser => {
                this.user = authUser ? authUser : null;
                setTimeout(() => {
                    this.isLoading = false;
                }, 1000);
            });
        },
        async getAccessToken() {
            try {
                return this.user ? await this.user.getIdToken() : null;
            }
            catch (error) {
                ErrorHandler.handleUserAuthError(this.user, error);
            }
        },
        async registerUser(email, password) {
            try {
                await auth.createUserWithEmailAndPassword(auth, email, password);
                await this.setUpNewUser();
            }
            catch (error) {
                ErrorHandler.handleUserAuthError(this.user, error);
            }
        },
        async loginUser(email, password) {
            try {
                await auth.signInWithEmailAndPassword(auth, email, password);
                await this.setUpNewUser();
            }
            catch (error) {
                ErrorHandler.handleUserAuthError(this.user, error);
            }
        },
        async loginUserAnonymously() {
            try {
                await auth.signInAnonymously(auth);
            }
            catch (error) {
                ErrorHandler.handleUserAuthError(this.user, error);
            }
        },
        async loginUserGoogle() {
            try {
                const response = await auth.signInWithPopup(auth, new auth.GoogleAuthProvider());
                await this.setUpNewUser();
            }
            catch (error) {
                ErrorHandler.handleUserAuthError(this.user, error);
            }
        },
        async logoutUser() {
            try {
                await auth.signOut();
            }
            catch (error) {
                ErrorHandler.handleUserAuthError(this.user, error);
            }
        },
        async sendPasswordResetEmail(email) {
            try {
                await auth.sendPasswordResetEmail(email);
            }
            catch (error) {
                ErrorHandler.handleUserAuthError(this.user, error);
            }
        },
        async setUpNewUser() {
            try {
                const userDocRef = db.doc(db, "users", this.user.uid);
                const userDoc = await db.getDoc(userDocRef);
                if (!userDoc.exists()) {
                    const componentStore = useComponentStore();
                    await componentStore.addNewUserComponents();
                }
            }
            catch (error) {
                ErrorHandler.handleUserAuthError(this.user, error);
            }
        },
        isMobile() {
            return screen.width <= 770 ? true : false;
        }
    }
});
//# sourceMappingURL=userStore.js.map