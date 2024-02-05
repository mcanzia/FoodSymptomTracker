import { defineStore } from 'pinia';
export const useErrorStore = defineStore('errorStore', {
    state: () => ({
        errorMessage: null
    }),
    actions: {
        setError(message) {
            if (this.errorMessage === null) {
                this.errorMessage = new CustomError(message);
            }
        },
        resetErrorMessage() {
            this.errorMessage = null;
        }
    }
});
//# sourceMappingURL=errorStore.js.map