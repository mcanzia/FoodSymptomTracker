import { defineStore } from 'pinia'
import { CustomError } from '../models/CustomError';

interface IErrorState {
    errorMessage : CustomError | null
}

export const useErrorStore = defineStore('errorStore', {
    state: () : IErrorState => ({
        errorMessage: null
      }),
    actions: {
        setError(message : string) {
            if (this.errorMessage === null) {
                this.errorMessage = new CustomError(message);
            }
        },
        resetErrorMessage() {
            this.errorMessage = null;
        }
    }
})