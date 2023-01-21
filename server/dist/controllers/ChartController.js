"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartController = void 0;
const ChartDao_1 = require("../dao/ChartDao");
const ChartService_1 = require("../services/ChartService");
class ChartController {
    // potentially look into dependency injection container frameworks
    constructor() {
        this.chartDao = new ChartDao_1.ChartDao;
    }
    async getAllCharts(request, response, next) {
        try {
            const chartDao = new ChartDao_1.ChartDao();
            const userAuth = response.locals.userAuth;
            const charts = await chartDao.getAllCharts(userAuth);
            response.status(200).json(JSON.stringify(charts));
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
    async getChartById(request, response, next) {
        try {
            const chartDao = new ChartDao_1.ChartDao();
            const userAuth = response.locals.userAuth;
            const chartId = request.params.chartId;
            const chart = await chartDao.getChartById(userAuth, chartId);
            response.status(200).json(JSON.stringify(chart));
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
    async addCharts(request, response, next) {
        try {
            const chartDao = new ChartDao_1.ChartDao();
            const userAuth = response.locals.userAuth;
            const charts = request.body;
            await chartDao.addCharts(userAuth, charts);
            response.status(200);
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
    async updateChart(request, response, next) {
        try {
            const chartDao = new ChartDao_1.ChartDao();
            const userAuth = response.locals.userAuth;
            const chartId = request.params.chartId;
            const chartData = request.body;
            await chartDao.updateChart(userAuth, chartId, chartData);
            response.status(200);
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
    async createAverageChart(request, response, next) {
        try {
            console.log('Average chart');
            const chartService = new ChartService_1.ChartService();
            const userAuth = response.locals.userAuth;
            const chart = request.body;
            chart.chartData = await chartService.createAverageChart(userAuth, chart.selectedComponent, chart.startDate, chart.endDate);
            response.status(200).json(JSON.stringify(chart));
        }
        catch (error) {
            response.send(error);
        }
    }
    async createFoodValueChart(request, response, next) {
        try {
            console.log('Food Value chart');
            const chartService = new ChartService_1.ChartService();
            const userAuth = response.locals.userAuth;
            const chart = request.body;
            if (!chart.selectedFood) {
                throw new Error('No food selected');
            }
            chart.chartData = await chartService.createFoodValueChart(userAuth, chart.selectedComponent, chart.selectedFood, chart.startDate, chart.endDate);
            response.status(200).json(JSON.stringify(chart));
        }
        catch (error) {
            response.send(error);
        }
    }
    async createSingleValueComponentWeightByFoodChart(request, response, next) {
        try {
            console.log('Component weight by food chart');
            const chartService = new ChartService_1.ChartService();
            const userAuth = response.locals.userAuth;
            const chart = request.body;
            chart.chartData = await chartService.createSingleValueComponentWeightByFoodChart(userAuth, chart.selectedComponent, chart.selectedFood, chart.startDate, chart.endDate);
            response.status(200).json(JSON.stringify(chart));
        }
        catch (error) {
            response.send(error);
        }
    }
    async createMultiValueComponentWeightByFoodChart(request, response, next) {
        try {
            console.log('component weight by all food chart');
            const chartService = new ChartService_1.ChartService();
            const userAuth = response.locals.userAuth;
            const chart = request.body;
            chart.chartData = await chartService.createMultiValueComponentWeightByFoodChart(userAuth, chart.selectedComponent, chart.selectedFood, chart.startDate, chart.endDate);
            response.status(200).json(JSON.stringify(chart));
        }
        catch (error) {
            response.send(error);
        }
    }
}
exports.ChartController = ChartController;
