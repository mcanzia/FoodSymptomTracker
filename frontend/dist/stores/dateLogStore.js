import { DateLog } from '../models/DateLog';
import { defineStore } from 'pinia';
import { DateLogService } from '../services/DateLogService';
export const useDateLogStore = defineStore('dateLogStore', {
    state: () => ({
        dateLogs: [],
        selectedDateLog: null,
        dayTitle: "Today",
        baseComponents: []
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
        async initializeStore(userToken, selectedDate, baseComponents) {
            this.baseComponents = baseComponents;
            this.initializeDateLogs(userToken, selectedDate);
        },
        async initializeDateLogs(userToken, selectedDate) {
            const dateLogService = new DateLogService();
            this.dateLogs = await dateLogService.getAllDateLogs(userToken);
            this.setSelectedDateLog(selectedDate);
        },
        async addDateLogs(userToken, dateLogs) {
            const dateLogService = new DateLogService();
            await dateLogService.addDateLogs(userToken, dateLogs);
            if (this.selectedDateLog) {
                await this.initializeDateLogs(userToken, this.selectedDateLog.date);
            }
            else {
                throw Error;
            }
        },
        async deleteDateLogs(userToken, dateLogsToDelete) {
            const dateLogService = new DateLogService();
            const dateLogIds = dateLogsToDelete.map(dateLogToDelete => dateLogToDelete.id);
            this.dateLogs = await this.dateLogs.filter(dateLog => !dateLogIds.includes(dateLog.id));
            await dateLogService.deleteDateLogs(userToken, dateLogsToDelete);
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
        async addDateLogComponent(userToken, componentToAdd) {
            this.dateLogs.map(dateLog => {
                dateLog.components.push(componentToAdd);
            });
            await this.addDateLogs(userToken, this.dateLogs);
        },
        async removeDateLogComponent(userToken, componentToRemove) {
            this.dateLogs.map(dateLog => {
                dateLog.components = dateLog.components.filter(component => component.id !== componentToRemove.id);
            });
            await this.addDateLogs(userToken, this.dateLogs);
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
            return this.selectedDateLog?.foodItems.some(food => food.name === foodName);
        },
    }
});
//# sourceMappingURL=dateLogStore.js.map