"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartService = void 0;
const ChartDao_1 = require("../dao/ChartDao");
const DateLogDao_1 = require("../dao/DateLogDao");
const FoodDao_1 = require("../dao/FoodDao");
const ChartData_1 = require("../models/ChartData");
const DataSet_1 = require("../models/DataSet");
const date_fns_1 = require("date-fns");
class ChartService {
    constructor() {
        this.chartDao = new ChartDao_1.ChartDao();
    }
    async createAverageChart(authId, startDate, endDate, selectedComponent) {
        console.log('Average chart');
        const foodDao = new FoodDao_1.FoodDao();
        const dateLogDao = new DateLogDao_1.DateLogDao();
        const foods = await foodDao.getAllFoods(authId);
        const dateLogs = await dateLogDao.getAllDateLogs(authId);
        const chartData = new ChartData_1.ChartData(startDate, endDate);
        foods.map(food => {
            const filteredDateLogs = dateLogs.filter(dateLog => { return dateLog.foodItems.includes(food); });
            let average = 0;
            filteredDateLogs.map(filteredDateLog => {
                const componentValue = Number(filteredDateLog.components.find(component => component.id === selectedComponent.id)?.values);
                if (!isNaN(componentValue) && componentValue !== undefined) {
                    average += componentValue;
                }
            });
            average = Number((average / filteredDateLogs.length).toFixed(2));
            let chartDataSet = new DataSet_1.DataSet(new Array(average), food.name);
            chartData.datasets.push(chartDataSet);
        });
        return chartData;
    }
    async createFoodValueChart(authId, startDate, endDate, selectedComponent, selectedFood) {
        console.log('Food Value chart');
        const dateLogDao = new DateLogDao_1.DateLogDao();
        const dateLogs = await dateLogDao.getDateLogsWithFood(authId, selectedFood);
        const dateMonthFoodValueMap = new Map();
        const chartData = new ChartData_1.ChartData(startDate, endDate);
        dateLogs.map(dateLog => {
            const dateMonth = (0, date_fns_1.format)(new Date(dateLog.date), "MMM");
            const dateYear = (0, date_fns_1.format)(new Date(dateLog.date), "Y");
            const monthYear = dateMonth + "-" + dateYear;
            const componentWeight = Number(dateLog.components.find(component => component.id === selectedComponent.id)?.values);
        });
        console.log(dateLogs);
    }
    async createComponentWeightByFoodChart(authId) {
        console.log('Component weight by food chart');
    }
    async createComponentWeightByAllFoodChart(authId) {
        console.log('component weight by all food chart');
    }
}
exports.ChartService = ChartService;
