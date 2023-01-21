import { defineStore } from 'pinia'
import { auth, GoogleAuthProvider } from '../firebase';

export const useUserStore = defineStore('userStore', {
    state: () => ({
      user: null
    }),
    getters: {
      isLoggedIn: (state) => state.user !== null
    },
    actions: {
      async initalizeAuthListener() {
        await auth.onAuthStateChanged(authUser => {
          this.user = authUser ? authUser : null;
        });
      },
      async getAccessToken() {
        return this.user ? await this.user.getIdToken() : null;
      },
      async registerUser(email, password) {
        await auth.createUserWithEmailAndPassword(email, password)
      },
      async loginUser(email, password) {
        await auth.signInWithEmailAndPassword(email, password);
      },
      async loginUserAnonymously() {
        await auth.signInAnonymously();
      },
      async loginUserGoogle() {
        await auth.signInWithPopup(GoogleAuthProvider);
      },
      async logoutUser() {
        await auth.signOut();
      }
    }
})