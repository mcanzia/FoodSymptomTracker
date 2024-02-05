import { Chart } from '@/models/Chart';
import { RequestType } from "../../models/RequestType";
import { useNotificationStore } from '../../stores/notificationStore';
import { NotificationType } from '../../models/NotificationType';

import * as Sentry from "@sentry/vue";
import { FirebaseError } from 'firebase/app';

export class ErrorHandler {

    static displayGenericError() {
        console.log("Error occurred. Please try again.");
    }

    static handleUserAuthError<T>(user : any, error : FirebaseError) {
        const notificationStore = useNotificationStore();
        if (error.code === 'auth/email-already-in-use') {
            notificationStore.setMessage("This email is already in use. Please try a different one.", NotificationType.ERROR);
        } else {
            notificationStore.setMessage("Error occurred during user authentication. Please try again.", NotificationType.ERROR);
        }

        Sentry.captureException(error, {
            tags: {
                operation: "Authentication"
            },
            extra: {
                user: user
            }
        });
    }
    
    static handleGetAllError<T>(userAuthToken : any, itemType : string, error : Error) {
        const notificationStore = useNotificationStore();
        notificationStore.setMessage(`Error retrieving data. Please try again.`, NotificationType.ERROR);

        Sentry.captureException(error, {
            tags: { 
                operation: RequestType.GET,
                itemType: itemType
            },
            extra: {
                userAuthToken: userAuthToken,
            },
        });
        
    }

    static handleGetByIdError<T>(userAuthToken : any, itemType : string, itemId : string, error : Error) {
        const notificationStore = useNotificationStore();
        notificationStore.setMessage(`Error retrieving data. Please try again.`, NotificationType.ERROR);

        Sentry.captureException(error, {
            tags: { 
                operation: RequestType.GET, 
                itemType: itemType
            },
            extra: {
                userAuthToken: userAuthToken,
            },
        });
    }

    static handleAddError<T>(userAuthToken : any, itemType : string, itemsToAdd : T[], error : Error) {
        const notificationStore = useNotificationStore();
        notificationStore.setMessage(`Error updating ${itemType}s. Please try again.`, NotificationType.ERROR);

        Sentry.captureException(error, {
            tags: { 
                operation: RequestType.POST, 
                itemType: itemType
            },
            extra: {
                items: itemsToAdd,
                userAuthToken: userAuthToken,
            },
        });
    }

    static handleUpdateError<T>(userAuthToken : any, itemType : string, itemToUpdate : T, error : Error) {
        const notificationStore = useNotificationStore();
        notificationStore.setMessage(`Error updating ${itemType}. Please try again.`, NotificationType.ERROR);

        Sentry.captureException(error, {
            tags: { 
                operation: RequestType.PUT,
                itemType: itemType
            },
            extra: {
                item: itemToUpdate,
                userAuthToken: userAuthToken,
            },
        });
    }

    static handleDeleteError<T>(userAuthToken : any, itemType : string, itemsToDelete : T[], error : Error) {
        const notificationStore = useNotificationStore();
        notificationStore.setMessage(`Error deleting ${itemType}s. Please try again.`, NotificationType.ERROR);

        Sentry.captureException(error, {
            tags: { 
                operation: RequestType.GET,
                itemType: itemType
            },
            extra: {
                items: itemsToDelete,
                userAuthToken: userAuthToken,
            },
        });
    }

    static handleChartError<T>(userAuthToken : any, chartType : string, chart : Chart, error : Error) {
        const notificationStore = useNotificationStore();
        notificationStore.setMessage(`Error editing chart. Please try again.`, NotificationType.ERROR);

        Sentry.captureException(error, {
            tags: { 
                operation: RequestType.GET,
                chartType: chartType 
            },
            extra: {
                chart: chart,
                userAuthToken: userAuthToken,
            },
        });
    }
}