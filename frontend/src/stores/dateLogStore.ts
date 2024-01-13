import { Component } from '../models/Component';
import { DateLog } from '../models/DateLog';
import { defineStore } from 'pinia'
import { DateLogService } from '../services/DateLogService';
import { DateUtil } from '../util/DateUtil';
import { ErrorHandler } from '../util/error/ErrorHandler';

interface IDateLogState {
  dateLogs : Array<DateLog>
  selectedDateLog? : DateLog | null
  dateLogCopy? : DateLog | null
  dayTitle : string
  baseComponents : Array<Component>
}

export const useDateLogStore = defineStore('dateLogStore', {
    state: () : IDateLogState => ({
        dateLogs: [],
        selectedDateLog: null,
        dateLogCopy: null,
        dayTitle: "Today",
        baseComponents: [],
      }),
    getters: {
      yesterdayDate: () => {
        const yesterday : Date = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return yesterday;
      },
      tomorrowDate: () => {
        const tomorrow : Date = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow;
      }
    },
    actions: {
      async initializeStore(selectedDate : string, baseComponents : Array<Component>) {
        this.baseComponents = baseComponents;
        this.initializeDateLogs(selectedDate);
      },
      async initializeDateLogs(selectedDate : string) {
        try {
          const dateLogService : DateLogService = new DateLogService();
          this.dateLogs = await dateLogService.getAllDateLogs();
          this.setSelectedDateLog(selectedDate);
        } catch (error : any) {
          ErrorHandler.displayGenericError();        }
      },
      async addDateLogs(dateLogs : Array<DateLog>) {
        try {
          const dateLogService = new DateLogService();
          await dateLogService.addDateLogs(dateLogs);
          if (this.selectedDateLog) {
            await this.initializeDateLogs(this.selectedDateLog.date);
          }
          this.dateLogCopy = null;
        } catch (error) {
          ErrorHandler.displayGenericError();
        }
      },
      async deleteDateLogs(dateLogsToDelete : Array<DateLog>) {
        try {
          const dateLogService = new DateLogService();
          const dateLogIds = dateLogsToDelete.map(dateLogToDelete => dateLogToDelete.id);
          await dateLogService.deleteDateLogs(dateLogsToDelete)
          this.dateLogs = await this.dateLogs.filter(dateLog => !dateLogIds.includes(dateLog.id));
        } catch (error) {
          ErrorHandler.displayGenericError();
        }
      },
      async selectDay(selectedDate : string) {
        await this.setSelectedDateLog(selectedDate);
        this.setDayTitle();
      },
      setSelectedDateLog(selectedDate : string) {
        this.selectedDateLog = this.dateLogs.find(dateLog => dateLog.date === selectedDate) ?
            this.dateLogs.find(dateLog => dateLog !== undefined && dateLog.date === selectedDate) :
            this.setNewDateFields(selectedDate);
      },
      setNewDateFields(selectedDate : string) {
        const date : DateLog = new DateLog("", selectedDate, [], this.baseComponents);
        date.components.map(component => {
            component.values = component.typeId === 1 ? 5 : component.typeId === 2 ? "" : [];
            return component;
        });
        return date;
      },
      async addDateLogComponent(componentToAdd : Component) {
        this.dateLogs.map(dateLog => {
          dateLog.components.push(componentToAdd);
        });
        await this.addDateLogs(this.dateLogs);
      },
      async removeDateLogComponent(componentToRemove : Component) {
        this.dateLogs.map(dateLog => {
          dateLog.components = dateLog.components.filter(component => component.id !== componentToRemove.id);
        });
        await this.addDateLogs(this.dateLogs);
      },
      setDayTitle() {
        if (!this.selectedDateLog) {
          throw Error;
        }
        switch(this.selectedDateLog.date) {
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
      containsFoodDuplicate(foodName : string) {
        return this.selectedDateLog?.foodItems.some(food => food.name.toLowerCase() === foodName.toLowerCase());
      },
    }
})