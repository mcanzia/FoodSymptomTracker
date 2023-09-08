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
    async createAverageChart(authId, selectedComponent, startDate, endDate) {
        const chartData = new ChartData_1.ChartData();
        chartData.datasets.push(new DataSet_1.DataSet([], "Average Value"));
        const foodDao = new FoodDao_1.FoodDao();
        const dateLogDao = new DateLogDao_1.DateLogDao();
        const foods = await foodDao.getAllFoods(authId);
        const dateLogs = await dateLogDao.getAllDateLogs(authId, startDate, endDate);
        foods.map(food => {
            const filteredDateLogs = dateLogs.filter(dateLog => { return dateLog.foodItems.some(foodItem => foodItem.id === food.id); });
            let average = 0;
            filteredDateLogs.map(filteredDateLog => {
                const componentValue = Number(filteredDateLog.components.find(component => component.id === selectedComponent.id)?.values);
                if (!isNaN(componentValue) && componentValue !== undefined) {
                    average += componentValue;
                }
            });
            average = average !== 0 ? Number((average / filteredDateLogs.length).toFixed(2)) : 0;
            chartData.datasets[0].data.push(average);
            chartData.labels.push(food.name);
        });
        return chartData;
    }
    async createFoodValueChart(authId, selectedComponent, selectedFood, startDate, endDate) {
        const chartData = new ChartData_1.ChartData();
        chartData.datasets.push(new DataSet_1.DataSet([], "Monthly Value - " + selectedFood.name));
        const dateLogDao = new DateLogDao_1.DateLogDao();
        const dateLogs = await dateLogDao.getDateLogsWithFood(authId, selectedFood, startDate, endDate);
        const dateMonthFoodValueMap = new Map();
        dateLogs.map(dateLog => {
            const month = (0, date_fns_1.format)(new Date(dateLog.date), "MMM");
            const year = (0, date_fns_1.format)(new Date(dateLog.date), "Y");
            const monthYear = month + "-" + year;
            const componentWeight = Number(dateLog.components.find(component => component.id === selectedComponent.id)?.values);
            if (!dateMonthFoodValueMap.has(monthYear)) {
                dateMonthFoodValueMap.set(monthYear, [componentWeight]);
            }
            else {
                dateMonthFoodValueMap.get(monthYear)?.push(componentWeight);
            }
        });
        for (const [key, value] of dateMonthFoodValueMap.entries()) {
            let average = 0;
            average = value.reduce((prev, curr) => Number(prev) + Number(curr), average);
            average = average !== 0 ? Number((average / value.length).toFixed(2)) : 0;
            chartData.labels.push(key);
            chartData.datasets[0].data.push(average);
        }
        return chartData;
    }
    async createSingleValueComponentWeightByFoodChart(authId, selectedComponent, selectedFood, startDate, endDate) {
        const dateLogDao = new DateLogDao_1.DateLogDao();
        const dateLogs = selectedFood ?
            await dateLogDao.getDateLogsWithFood(authId, selectedFood, startDate, endDate) :
            await dateLogDao.getAllDateLogs(authId, startDate, endDate);
        // Map (keys are the select options of the selected component and values are count of how many times that option was chosen within the date range)
        const weightValueMap = new Map(selectedComponent.selectOptions.map(selectOption => [selectOption.value, 0]));
        dateLogs.map(dateLog => {
            const componentValue = String(dateLog.components.find(component => component.id === selectedComponent.id)?.values);
            if (componentValue !== undefined && componentValue != "") {
                weightValueMap.set(componentValue, Number(weightValueMap.get(componentValue)) + 1);
            }
        });
        const chartLabel = selectedFood ? "Component Value Weight - " + selectedFood.name : "Component Value Weight";
        return this.setChartData(weightValueMap, chartLabel);
    }
    async createMultiValueComponentWeightByFoodChart(authId, selectedComponent, selectedFood, startDate, endDate) {
        const dateLogDao = new DateLogDao_1.DateLogDao();
        const dateLogs = selectedFood ?
            await dateLogDao.getDateLogsWithFood(authId, selectedFood, startDate, endDate) :
            await dateLogDao.getAllDateLogs(authId, startDate, endDate);
        const weightValueMap = new Map(selectedComponent.selectOptions.map(selectOption => [selectOption.value, 0]));
        dateLogs.map(dateLog => {
            const componentValues = dateLog.components.find(component => component.id === selectedComponent.id)?.values ?? new Array();
            componentValues.map(componentValue => {
                if (componentValue !== undefined && componentValue != "") {
                    weightValueMap.set(componentValue, Number(weightValueMap.get(componentValue)) + 1);
                }
            });
        });
        const chartLabel = selectedFood ? "Component Value Weight - " + selectedFood.name : "Component Value Weight";
        return this.setChartData(weightValueMap, chartLabel);
    }
    setChartData(weightValueMap, chartLabel) {
        const chartData = new ChartData_1.ChartData();
        chartData.datasets.push(new DataSet_1.DataSet([], chartLabel));
        for (const [key, value] of weightValueMap.entries()) {
            chartData.labels.push(key);
            chartData.datasets[0].data.push(value);
        }
        return chartData;
    }
}
exports.ChartService = ChartService;
