import { DateLog } from '../models/DateLog';
import { defineStore } from 'pinia';
import { DateLogService } from '../services/DateLogService';
import { ErrorHandler } from '../util/error/ErrorHandler';
export const useDateLogStore = defineStore('dateLogStore', {
    state: () => ({
        dateLogs: [],
        selectedDateLog: null,
        dateLogCopy: null,
        dayTitle: "Today",
        baseComponents: [],
    }),
    getters: {
        yesterdayDate: () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            return yesterday;
        },
        tomorrowDate: () => {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            return tomorrow;
        }
    },
    actions: {
        async initializeStore(selectedDate, baseComponents) {
            this.baseComponents = baseComponents;
            this.initializeDateLogs(selectedDate);
        },
        async initializeDateLogs(selectedDate) {
            try {
                const dateLogService = new DateLogService();
                this.dateLogs = await dateLogService.getAllDateLogs();
                this.setSelectedDateLog(selectedDate);
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async addDateLogs(dateLogs) {
            try {
                const dateLogService = new DateLogService();
                await dateLogService.addDateLogs(dateLogs);
                if (this.selectedDateLog) {
                    await this.initializeDateLogs(this.selectedDateLog.date);
                }
                this.dateLogCopy = null;
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async deleteDateLogs(dateLogsToDelete) {
            try {
                const dateLogService = new DateLogService();
                const dateLogIds = dateLogsToDelete.map(dateLogToDelete => dateLogToDelete.id);
                await dateLogService.deleteDateLogs(dateLogsToDelete);
                this.dateLogs = await this.dateLogs.filter(dateLog => !dateLogIds.includes(dateLog.id));
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async selectDay(selectedDate) {
            await this.setSelectedDateLog(selectedDate);
            this.setDayTitle();
        },
        setSelectedDateLog(selectedDate) {
            this.selectedDateLog = this.dateLogs.find(dateLog => dateLog.date === selectedDate) ?
                this.dateLogs.find(dateLog => dateLog !== undefined && dateLog.date === selectedDate) :
                this.setNewDateFields(selectedDate);
        },
        setNewDateFields(selectedDate) {
            const date = new DateLog("", selectedDate, [], this.baseComponents);
            date.components.map(component => {
                component.values = component.typeId === 1 ? 5 : component.typeId === 2 ? "" : [];
                return component;
            });
            return date;
        },
        async addDateLogComponent(componentToAdd) {
            this.dateLogs.map(dateLog => {
                dateLog.components.push(componentToAdd);
            });
            await this.addDateLogs(this.dateLogs);
        },
        async removeDateLogComponent(componentToRemove) {
            this.dateLogs.map(dateLog => {
                dateLog.components = dateLog.components.filter(component => component.id !== componentToRemove.id);
            });
            await this.addDateLogs(this.dateLogs);
        },
        setDayTitle() {
            if (!this.selectedDateLog) {
                throw Error;
            }
            switch (this.selectedDateLog.date) {
                case new Date().toLocaleDateString():
                    this.dayTitle = "Today";
                    break;
                case this.tomorrowDate.toLocaleDateString():
                    this.dayTitle = "Tomorrow";
                    break;
                case this.yesterdayDate.toLocaleDateString():
                    this.dayTitle = "Yesterday";
                    break;
                default:
                    this.dayTitle = this.selectedDateLog.date;
                    break;
            }
        },
        containsFoodDuplicate(foodName) {
            return this.selectedDateLog?.foodItems.some(food => food.name.toLowerCase() === foodName.toLowerCase());
        },
    }
});
//# sourceMappingURL=dateLogStore.js.map