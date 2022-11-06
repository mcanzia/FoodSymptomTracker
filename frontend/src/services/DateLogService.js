import { DateLogController } from '../controllers/DateLogController';

export class DateLogService {
    constructor() {
        this.dateLogController = new DateLogController();
    }

    async getAllDateLogs(userAuth) {
        const allDateLogs = await this.dateLogController.getAllDateLogs(userAuth);
        console.log(allDateLogs);
        return allDateLogs;
    }

    async getDateLogById(userAuth, dateLogId) {
        const dateLog = await this.dateLogController.getDateLogById(userAuth, dateLogId);
        console.log(dateLog);
        return dateLog;
    }

    async addDateLogs(userAuth, dateLogs) {
        const dateLog = await this.dateLogController.addDateLogs(userAuth, dateLogs);
        console.log(dateLog);
    }

    async updateDateLog(userAuth, dateLog) {
        const { id, ...dateLogUpdate } = dateLog;
        await this.dateLogController.updateDateLog(userAuth, id, dateLogUpdate);
    }
}