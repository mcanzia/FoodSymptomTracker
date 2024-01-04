import { DateLogController } from '../controllers/DateLogController';
export class DateLogService {
    dateLogController;
    constructor() {
        this.dateLogController = new DateLogController();
    }
    async getAllDateLogs(userAuth) {
        try {
            const response = await this.dateLogController.getAllDateLogs(userAuth);
            const allDateLogs = response ? JSON.parse(response) : [];
            return allDateLogs;
        }
        catch (error) {
            throw error;
        }
    }
    async getDateLogById(userAuth, dateLogId) {
        try {
            const dateLog = await this.dateLogController.getDateLogById(userAuth, dateLogId);
            return dateLog;
        }
        catch (error) {
            throw error;
        }
    }
    async addDateLogs(userAuth, dateLogs) {
        try {
            const dateLog = await this.dateLogController.addDateLogs(userAuth, dateLogs);
            return dateLog;
        }
        catch (error) {
            throw error;
        }
    }
    async updateDateLog(userAuth, dateLog) {
        try {
            await this.dateLogController.updateDateLog(userAuth, dateLog);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteDateLogs(userAuth, dateLogs) {
        try {
            const dateLog = await this.dateLogController.deleteDateLogs(userAuth, dateLogs);
            return dateLog;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=DateLogService.js.map