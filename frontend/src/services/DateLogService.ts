import { DateLogController } from '../controllers/DateLogController';
import { DateLog } from '../models/DateLog';

export class DateLogService {

    private dateLogController : DateLogController;

    constructor() {
        this.dateLogController = new DateLogController();
    }

    async getAllDateLogs(userAuth : any) {
        const allDateLogs = JSON.parse(await this.dateLogController.getAllDateLogs(userAuth));
        return allDateLogs;
    }

    async getDateLogById(userAuth : any, dateLogId : string) {
        const dateLog = await this.dateLogController.getDateLogById(userAuth, dateLogId);
        return dateLog;
    }

    async addDateLogs(userAuth : any, dateLogs : Array<DateLog>) {
        const dateLog = await this.dateLogController.addDateLogs(userAuth, dateLogs);
        return dateLog;
    }

    async updateDateLog(userAuth : any, dateLog : DateLog) {
        await this.dateLogController.updateDateLog(userAuth, dateLog);
    }
}