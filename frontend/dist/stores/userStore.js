import { defineStore } from 'pinia';
import { auth } from '../firebase';
export const useUserStore = defineStore('userStore', {
    state: () => ({
        user: null,
        isLoading: false
    }),
    getters: {
        isLoggedIn: (state) => state.user !== null
    },
    actions: {
        async initalizeAuthListener() {
            this.isLoading = true;
            await auth.onAuthStateChanged(authUser => {
                this.user = authUser ? authUser : null;
                this.isLoading = false;
            });
        },
        async getAccessToken() {
            return this.user ? await this.user.getIdToken() : null;
        },
        async registerUser(email, password) {
            await auth.createUserWithEmailAndPassword(auth, email, password);
        },
        async loginUser(email, password) {
            await auth.signInWithEmailAndPassword(auth, email, password);
        },
        async loginUserAnonymously() {
            //await auth.signInAnonymously(auth);
            await auth.signInAnonymously(auth);
        },
        async loginUserGoogle() {
            await auth.signInWithPopup(auth, new auth.GoogleAuthProvider());
            //await signInWithPopup(auth, new GoogleAuthProvider());
        },
        async logoutUser() {
            await auth.signOut();
        }
    }
});
//# sourceMappingURL=userStore.js.map