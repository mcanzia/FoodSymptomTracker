import { DateLogController } from '../controllers/DateLogController';
export class DateLogService {
    constructor() {
        this.dateLogController = new DateLogController();
    }
    async getAllDateLogs(userAuth) {
        const allDateLogs = JSON.parse(await this.dateLogController.getAllDateLogs(userAuth));
        return allDateLogs;
    }
    async getDateLogById(userAuth, dateLogId) {
        const dateLog = await this.dateLogController.getDateLogById(userAuth, dateLogId);
        return dateLog;
    }
    async addDateLogs(userAuth, dateLogs) {
        const dateLog = await this.dateLogController.addDateLogs(userAuth, dateLogs);
        return dateLog;
    }
    async updateDateLog(userAuth, dateLog) {
        await this.dateLogController.updateDateLog(userAuth, dateLog);
    }
}
//# sourceMappingURL=DateLogService.js.map