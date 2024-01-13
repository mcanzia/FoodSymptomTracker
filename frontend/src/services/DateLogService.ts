import { DateLogController } from '../controllers/DateLogController';
import { DateLog } from '../models/DateLog';
import { useUserStore } from '../stores/userStore';

export class DateLogService {

    private dateLogController : DateLogController;
    private userStore : any;

    constructor() {
        this.dateLogController = new DateLogController();
        this.userStore = useUserStore();
    }

    async getAllDateLogs() {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response = await this.dateLogController.getAllDateLogs(userAccessToken);
            const allDateLogs = response ? JSON.parse(response) : [];
            return allDateLogs;
        } catch(error) {
            throw error;
        }
        
    }

    async getDateLogById(dateLogId : string) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const dateLog = await this.dateLogController.getDateLogById(userAccessToken, dateLogId);
            return dateLog;
        } catch (error) {
            throw error;
        }
        
    }

    async addDateLogs(dateLogs : Array<DateLog>) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const dateLog = await this.dateLogController.addDateLogs(userAccessToken, dateLogs);
            return dateLog;
        } catch (error) {
            throw error;
        }
    }

    async updateDateLog(dateLog : DateLog) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            await this.dateLogController.updateDateLog(userAccessToken, dateLog);
        } catch (error) {
            throw error;
        }
    }

    async deleteDateLogs(dateLogs : Array<DateLog>) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const dateLog = await this.dateLogController.deleteDateLogs(userAccessToken, dateLogs);
            return dateLog;
        } catch (error) {
            throw error;
        }
    }
}