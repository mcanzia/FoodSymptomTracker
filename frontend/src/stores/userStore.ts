import { defineStore } from 'pinia'
import { auth } from '../firebase';
import { ErrorHandler } from '../util/error/ErrorHandler';

interface IUserState {
  user : any,
  isLoading: boolean,
}

export const useUserStore = defineStore('userStore', {
    state: () : IUserState => ({
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
        } catch (error : any) {
          ErrorHandler.handleUserAuthError(this.user, error);
        }
      },
      async registerUser(email : string, password : string) {
        try {
          await auth.createUserWithEmailAndPassword(auth, email, password);
        } catch (error : any) {
          ErrorHandler.handleUserAuthError(this.user, error);
        }
      },
      async loginUser(email : string, password : string) {
        try {
          await auth.signInWithEmailAndPassword(auth, email, password);
        } catch (error : any) {
          ErrorHandler.handleUserAuthError(this.user, error);
        }
      },
      async loginUserAnonymously() {
        try {
          await auth.signInAnonymously(auth);
        } catch (error : any) {
          ErrorHandler.handleUserAuthError(this.user, error);
        }
      },
      async loginUserGoogle() {
        try {
          await auth.signInWithPopup(auth, new auth.GoogleAuthProvider());
        } catch (error : any) {
          ErrorHandler.handleUserAuthError(this.user, error);
        }
      },
      async logoutUser() {
        try {
          await auth.signOut();
        } catch (error : any) {
          ErrorHandler.handleUserAuthError(this.user, error);
        }
      }
    }
})