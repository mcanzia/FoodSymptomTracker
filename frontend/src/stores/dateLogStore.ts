import { Component } from '@/models/Component';
import { DateLog } from '@/models/DateLog';
import { defineStore } from 'pinia'
import { DateLogService } from '../services/DateLogService';
import { DateUtil } from '../util/DateUtil';

interface IDateLogState {
  dateLogs : Array<DateLog>
  selectedDateLog? : DateLog | null
  dayTitle : string
  baseComponents : Array<Component>
}

export const useDateLogStore = defineStore('dateLogStore', {
    state: () : IDateLogState => ({
        dateLogs: [],
        selectedDateLog: null,
        dayTitle: "Today",
        baseComponents: []
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
      async initializeStore(userToken : any, selectedDate : string, baseComponents : Array<Component>) {
        this.baseComponents = baseComponents;
        this.initializeDateLogs(userToken, selectedDate);
      },
      async initializeDateLogs(userToken : any, selectedDate : string) {
        const dateLogService : DateLogService = new DateLogService();
        this.dateLogs = await dateLogService.getAllDateLogs(userToken);
        this.setSelectedDateLog(selectedDate);
      },
      async addDateLogs(userToken : any, dateLogs : Array<DateLog>) {
        const dateLogService = new DateLogService();
        await dateLogService.addDateLogs(userToken, dateLogs);
        if (this.selectedDateLog) {
          await this.initializeDateLogs(userToken, this.selectedDateLog.date);
        } else {
          throw Error;
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
      async addDateLogComponent(userToken : any, componentToAdd : Component) {
        this.dateLogs.map(dateLog => {
          dateLog.components.push(componentToAdd);
        });
        await this.addDateLogs(userToken, this.dateLogs);
      },
      async removeDateLogComponent(userToken : any, componentToRemove : Component) {
        this.dateLogs.map(dateLog => {
          dateLog.components = dateLog.components.filter(component => component.id !== componentToRemove.id);
        });
        await this.addDateLogs(userToken, this.dateLogs);
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
        return this.selectedDateLog?.foodItems.some(food => food.name === foodName);
      },
    }
})