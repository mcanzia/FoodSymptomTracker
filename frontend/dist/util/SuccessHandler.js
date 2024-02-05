import { useNotificationStore } from '../stores/notificationStore';
import { NotificationType } from '../models/NotificationType';
export class SuccessHandler {
    static showNotification(message) {
        const notificationStore = useNotificationStore();
        notificationStore.setMessage(message, NotificationType.SUCCESS);
    }
}
//# sourceMappingURL=SuccessHandler.js.map