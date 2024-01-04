import { RequestType } from "../../models/RequestType";
import { useErrorStore } from '../../stores/errorStore';
import * as Sentry from "@sentry/vue";
export class ErrorHandler {
    static displayGenericError() {
        console.log("Error occurred. Please try again.");
    }
    static handleUserAuthError(user, error) {
        const errorStore = useErrorStore();
        errorStore.setError("Error occurred during user authentication. Please try again.");
        Sentry.captureException(error, {
            tags: {
                operation: "Authentication"
            },
            extra: {
                user: user
            }
        });
    }
    static handleGetAllError(userAuthToken, itemType, error) {
        const errorStore = useErrorStore();
        errorStore.setError(`Error retrieving data. Please try again.`);
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
    static handleGetByIdError(userAuthToken, itemType, itemId, error) {
        const errorStore = useErrorStore();
        errorStore.setError(`Error retrieving data. Please try again.`);
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
    static handleAddError(userAuthToken, itemType, itemsToAdd, error) {
        const errorStore = useErrorStore();
        errorStore.setError(`Error updating ${itemType}s. Please try again.`);
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
    static handleUpdateError(userAuthToken, itemType, itemToUpdate, error) {
        const errorStore = useErrorStore();
        errorStore.setError(`Error updating ${itemType}. Please try again.`);
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
    static handleDeleteError(userAuthToken, itemType, itemsToDelete, error) {
        const errorStore = useErrorStore();
        errorStore.setError(`Error deleting ${itemType}s. Please try again.`);
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
    static handleChartError(userAuthToken, chartType, chart, error) {
        const errorStore = useErrorStore();
        errorStore.setError(`Error editing chart. Please try again.`);
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
//# sourceMappingURL=ErrorHandler.js.map