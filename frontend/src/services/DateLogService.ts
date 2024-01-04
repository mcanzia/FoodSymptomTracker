import { DateLogController } from '../controllers/DateLogController';
import { DateLog } from '../models/DateLog';

export class DateLogService {

    private dateLogController : DateLogController;

    constructor() {
        this.dateLogController = new DateLogController();
    }

    async getAllDateLogs(userAuth : any) {
        try {
            const response = await this.dateLogController.getAllDateLogs(userAuth);
            const allDateLogs = response ? JSON.parse(response) : [];
            return allDateLogs;
        } catch(error) {
            throw error;
        }
        
    }

    async getDateLogById(userAuth : any, dateLogId : string) {
        try {
            const dateLog = await this.dateLogController.getDateLogById(userAuth, dateLogId);
            return dateLog;
        } catch (error) {
            throw error;
        }
        
    }

    async addDateLogs(userAuth : any, dateLogs : Array<DateLog>) {
        try {
            const dateLog = await this.dateLogController.addDateLogs(userAuth, dateLogs);
            return dateLog;
        } catch (error) {
            throw error;
        }
    }

    async updateDateLog(userAuth : any, dateLog : DateLog) {
        try {
            await this.dateLogController.updateDateLog(userAuth, dateLog);
        } catch (error) {
            throw error;
        }
    }

    async deleteDateLogs(userAuth : any, dateLogs : Array<DateLog>) {
        try {
            const dateLog = await this.dateLogController.deleteDateLogs(userAuth, dateLogs);
            return dateLog;
        } catch (error) {
            throw error;
        }
    }
}