import { defineStore } from 'pinia'
import { DateLogService } from '../services/DateLogService';
import { DateUtil } from '../util/DateUtil';

export const useDateLogStore = defineStore('dateLogStore', {
    state: () => ({
        dateLogs: [],
        selectedDateLog: null,
        dayTitle: "Today",
        yesterdayDate: "",
        tomorrowDate: "",
        baseComponents: null
      }),
    actions: {
      async initializeDateLogs(userToken, selectedDate, baseComponents) {
        this.baseComponents = baseComponents;
        const dateLogService = new DateLogService();
        this.dateLogs = await dateLogService.getAllDateLogs(userToken);
        this.setSelectedDateLog(selectedDate);
        this.yesterdayDate = new Date();
        this.yesterdayDate.setDate(this.yesterdayDate.getDate() - 1);
        this.tomorrowDate = new Date();
        this.tomorrowDate.setDate(this.tomorrowDate.getDate() + 1);
        
      },
      async addDateLogs(userToken, dateLogs) {
        const dateLogService = new DateLogService();
        await dateLogService.addDateLogs(userToken, dateLogs);
        await dateLogService.initializeDateLogs(userToken, this.selectedDateLog.date);
      },
      async updateComponents(userToken, component) {
        const dateLogService = new DateLogService();
        await dateLogService.addDateLogs(userToken, component);
      },
      async selectDay(selectedDate) {
        await this.setSelectedDateLog(selectedDate);
        this.setDayTitle();
      },
      setSelectedDateLog(selectedDate) {
        this.selectedDateLog = this.dateLogs.find(dateLog => dateLog.date === selectedDate) ?
            this.dateLogs.find(dateLog => dateLog.date === selectedDate) : 
            this.setNewDateFields(selectedDate);
      },
      setNewDateFields(selectedDate) {
        let date = {
            id: null,
            date: selectedDate,
            dateValue: DateUtil.convertDateToUTC(new Date(selectedDate)),
            foodItems: [],
            components: this.baseComponents
        };
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
      containsFoodDuplicate(foodName) {
        return this.selectedDateLog.foodItems.some(food => food.name === foodName);
      },
    }
})