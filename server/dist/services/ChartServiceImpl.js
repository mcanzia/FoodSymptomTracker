"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartServiceImpl = void 0;
const ChartData_1 = require("../models/ChartData");
const DataSet_1 = require("../models/DataSet");
const date_fns_1 = require("date-fns");
const FoodDaoImpl_1 = require("../dao/FoodDaoImpl");
const DateLogDaoImpl_1 = require("../dao/DateLogDaoImpl");
const ChartType_1 = __importDefault(require("../models/ChartType"));
class ChartServiceImpl {
    async recalculateCharts(authId, charts) {
        try {
            const chartPromises = charts.map(async (chart) => {
                switch (chart.chartType) {
                    case ChartType_1.default.AVERAGE:
                        chart.chartData = await this.createAverageChart(authId, chart.selectedComponent, chart.chartMaxFoods);
                        return chart;
                    case ChartType_1.default.FOODVALUE:
                        if (!chart.selectedFood) {
                            throw new Error();
                        }
                        chart.chartData = await this.createFoodValueChart(authId, chart.selectedComponent, chart.selectedFood);
                        return chart;
                    case ChartType_1.default.SVCWEIGHTBYFOOD:
                        chart.chartData = await this.createSingleValueComponentWeightByFoodChart(authId, chart.selectedComponent, chart.selectedFood);
                        return chart;
                    case ChartType_1.default.MVCWEIGHTBYFOOD:
                        chart.chartData = await this.createMultiValueComponentWeightByFoodChart(authId, chart.selectedComponent, chart.selectedFood);
                        return chart;
                    default:
                        return chart;
                }
            });
            return await Promise.all(chartPromises);
        }
        catch (error) {
            console.log("Show error");
        }
    }
    async createAverageChart(authId, selectedComponent, chartMaxFoods, startDate, endDate) {
        const chartData = new ChartData_1.ChartData();
        chartData.datasets.push(new DataSet_1.DataSet([], "Average Value - " + selectedComponent.name));
        const foodDao = new FoodDaoImpl_1.FoodDaoImpl();
        const dateLogDao = new DateLogDaoImpl_1.DateLogDaoImpl();
        const foods = await foodDao.getAllFoods(authId);
        const dateLogs = await dateLogDao.getAllDateLogs(authId, startDate, endDate);
        const foodAverageMap = new Map();
        foods.map(food => {
            const filteredDateLogs = dateLogs.filter(dateLog => { return dateLog.foodItems.some(foodItem => foodItem.id === food.id); });
            let average = 0;
            filteredDateLogs.map(filteredDateLog => {
                const componentValue = Number(filteredDateLog.components.find(component => component.id === selectedComponent.id)?.values);
                if (!isNaN(componentValue) && componentValue !== undefined) {
                    average += componentValue;
                }
            });
            if (average === 0) {
                return;
            }
            average = Number((average / filteredDateLogs.length).toFixed(2));
            if (chartMaxFoods && chartMaxFoods > 0) {
                foodAverageMap.set(food.name, average);
            }
            else {
                chartData.datasets[0].data.push(average);
                chartData.labels.push(food.name);
            }
        });
        if (chartMaxFoods && chartMaxFoods > 0) {
            const sortedMap = new Map([...foodAverageMap.entries()]
                .sort((a, b) => b[1] - a[1])
                .slice(0, chartMaxFoods));
            for (const [key, value] of sortedMap.entries()) {
                chartData.datasets[0].data.push(value);
                chartData.labels.push(key);
            }
        }
        return chartData;
    }
    async createFoodValueChart(authId, selectedComponent, selectedFood, startDate, endDate) {
        const chartData = new ChartData_1.ChartData();
        chartData.datasets.push(new DataSet_1.DataSet([], selectedComponent.name + " - " + selectedFood.name));
        const dateLogDao = new DateLogDaoImpl_1.DateLogDaoImpl();
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
        const dateLogDao = new DateLogDaoImpl_1.DateLogDaoImpl();
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
        const chartLabel = selectedFood ? selectedComponent.name + " - " + selectedFood.name : selectedComponent.name;
        return this.setChartData(weightValueMap, chartLabel);
    }
    async createMultiValueComponentWeightByFoodChart(authId, selectedComponent, selectedFood, startDate, endDate) {
        const dateLogDao = new DateLogDaoImpl_1.DateLogDaoImpl();
        const dateLogs = selectedFood ?
            await dateLogDao.getDateLogsWithFood(authId, selectedFood, startDate, endDate) :
            await dateLogDao.getAllDateLogs(authId, startDate, endDate);
        const weightValueMap = new Map(selectedComponent.selectOptions.map(selectOption => [selectOption.value, 0]));
        dateLogs.map(dateLog => {
            const componentValues = dateLog.components.find(component => component.id === selectedComponent.id)?.values ?? new Array();
            console.log(componentValues);
            componentValues.map(componentValue => {
                if (componentValue !== undefined && componentValue != "") {
                    weightValueMap.set(componentValue, Number(weightValueMap.get(componentValue)) + 1);
                }
            });
        });
        const chartLabel = selectedFood ? selectedComponent.name + " - " + selectedFood.name : selectedComponent.name;
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
exports.ChartServiceImpl = ChartServiceImpl;
