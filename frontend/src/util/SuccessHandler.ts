import { useNotificationStore } from '../stores/notificationStore';
import { NotificationType } from '../models/NotificationType';

export class SuccessHandler {
    static showNotification(message : string) {
        const notificationStore = useNotificationStore();
        notificationStore.setMessage(message, NotificationType.SUCCESS);
    }
}