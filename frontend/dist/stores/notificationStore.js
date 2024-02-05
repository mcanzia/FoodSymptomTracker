import { defineStore } from 'pinia';
import { CustomNotification } from '../models/CustomNotification';
import { NotificationType } from '../models/NotificationType';
export const useNotificationStore = defineStore('notificationStore', {
    state: () => ({
        errorMessage: null,
        successMessage: null
    }),
    actions: {
        setMessage(message, type) {
            if (type === NotificationType.SUCCESS) {
                if (this.successMessage === null) {
                    this.successMessage = new CustomNotification(message, NotificationType.SUCCESS);
                }
            }
            else {
                if (this.errorMessage === null) {
                    this.errorMessage = new CustomNotification(message, NotificationType.ERROR);
                }
            }
        },
        resetMessage() {
            this.errorMessage = null;
            this.successMessage = null;
        }
    }
});
//# sourceMappingURL=notificationStore.js.map