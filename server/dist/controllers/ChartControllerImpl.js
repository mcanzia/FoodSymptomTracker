"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartControllerImpl = void 0;
const CustomError_1 = require("../util/error/CustomError");
const logger_1 = __importDefault(require("../util/logs/logger"));
const ChartDaoImpl_1 = require("../dao/ChartDaoImpl");
const ChartServiceImpl_1 = require("../services/ChartServiceImpl");
class ChartControllerImpl {
    chartDao;
    // potentially look into dependency injection container frameworks
    constructor() {
        this.chartDao = new ChartDaoImpl_1.ChartDaoImpl;
    }
    async getAllCharts(request, response, next) {
        try {
            logger_1.default.info("Retrieving charts for user: " + response.locals.userAuth);
            const chartDao = new ChartDaoImpl_1.ChartDaoImpl();
            const chartService = new ChartServiceImpl_1.ChartServiceImpl();
            const userAuth = response.locals.userAuth;
            let charts = await chartDao.getAllCharts(userAuth);
            charts = await chartService.recalculateCharts(userAuth, charts) ?? charts;
            logger_1.default.info("Number of charts retrieved successfully: " + charts.length);
            response.status(200).json(JSON.stringify(charts));
        }
        catch (error) {
            logger_1.default.error("Error retrieving charts for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async getChartById(request, response, next) {
        try {
            logger_1.default.info("Retrieving chart for user: " + response.locals.userAuth);
            const chartDao = new ChartDaoImpl_1.ChartDaoImpl();
            const userAuth = response.locals.userAuth;
            const chartId = request.params.chartId;
            const chart = await chartDao.getChartById(userAuth, chartId);
            logger_1.default.info("Chart retrieved successfully: " + JSON.stringify(chart));
            response.status(200).json(JSON.stringify(chart));
        }
        catch (error) {
            logger_1.default.error("Error retrieving chart for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async addCharts(request, response, next) {
        try {
            logger_1.default.info("Adding charts for user: " + response.locals.userAuth);
            logger_1.default.info("Charts: " + JSON.stringify(request.body));
            const chartDao = new ChartDaoImpl_1.ChartDaoImpl();
            const userAuth = response.locals.userAuth;
            const charts = request.body;
            await chartDao.addCharts(userAuth, charts);
            logger_1.default.info("Successfully added charts");
            response.status(200).send("Success");
        }
        catch (error) {
            logger_1.default.error("Error adding charts for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async updateChart(request, response, next) {
        try {
            logger_1.default.info("Updating charts for user: " + response.locals.userAuth);
            logger_1.default.info("Charts: " + JSON.stringify(request.body));
            const chartDao = new ChartDaoImpl_1.ChartDaoImpl();
            const userAuth = response.locals.userAuth;
            const chartId = request.params.chartId;
            const chartData = request.body;
            await chartDao.updateChart(userAuth, chartId, chartData);
            logger_1.default.info("Successfully updated charts");
            response.status(200).send("Success");
        }
        catch (error) {
            logger_1.default.error("Error updating charts for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async deleteCharts(request, response, next) {
        try {
            logger_1.default.info("Deleting charts for user: " + response.locals.userAuth);
            logger_1.default.info("Charts: " + JSON.stringify(request.body));
            const chartDao = new ChartDaoImpl_1.ChartDaoImpl();
            const userAuth = response.locals.userAuth;
            const charts = request.body;
            const chartIds = charts.map(chart => chart.id);
            await chartDao.deleteCharts(userAuth, chartIds);
            logger_1.default.info("Successfully deleted charts");
            response.status(200).send("Success");
        }
        catch (error) {
            logger_1.default.error("Error deleting charts for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async createAverageChart(request, response, next) {
        try {
            logger_1.default.info("Creating average chart for user: " + response.locals.userAuth);
            logger_1.default.info("Chart Details: " + JSON.stringify(request.body));
            const chartService = new ChartServiceImpl_1.ChartServiceImpl();
            const userAuth = response.locals.userAuth;
            const chart = request.body;
            chart.chartData = await chartService.createAverageChart(userAuth, chart.selectedComponent, chart.startDate, chart.endDate);
            logger_1.default.info("Successfully created average chart");
            response.status(200).json(JSON.stringify(chart));
        }
        catch (error) {
            logger_1.default.error("Error creating average chart for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async createFoodValueChart(request, response, next) {
        try {
            logger_1.default.info("Creating food value chart for user: " + response.locals.userAuth);
            logger_1.default.info("Chart Details: " + JSON.stringify(request.body));
            const chartService = new ChartServiceImpl_1.ChartServiceImpl();
            const userAuth = response.locals.userAuth;
            const chart = request.body;
            if (!chart.selectedFood) {
                throw new CustomError_1.CustomError('No food selected');
            }
            chart.chartData = await chartService.createFoodValueChart(userAuth, chart.selectedComponent, chart.selectedFood, chart.startDate, chart.endDate);
            logger_1.default.info("Successfully created food value chart");
            response.status(200).json(JSON.stringify(chart));
        }
        catch (error) {
            logger_1.default.error("Error creating food value chart for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async createSingleValueComponentWeightByFoodChart(request, response, next) {
        try {
            logger_1.default.info("Creating single component weight by food chart for user: " + response.locals.userAuth);
            logger_1.default.info("Chart Details: " + JSON.stringify(request.body));
            const chartService = new ChartServiceImpl_1.ChartServiceImpl();
            const userAuth = response.locals.userAuth;
            const chart = request.body;
            chart.chartData = await chartService.createSingleValueComponentWeightByFoodChart(userAuth, chart.selectedComponent, chart.selectedFood, chart.startDate, chart.endDate);
            logger_1.default.info("Successfully created single component weight by food chart");
            response.status(200).json(JSON.stringify(chart));
        }
        catch (error) {
            logger_1.default.error("Error creating single component weight by food chart for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async createMultiValueComponentWeightByFoodChart(request, response, next) {
        try {
            logger_1.default.info("Creating multi component weight by food chart for user: " + response.locals.userAuth);
            logger_1.default.info("Chart Details: " + JSON.stringify(request.body));
            const chartService = new ChartServiceImpl_1.ChartServiceImpl();
            const userAuth = response.locals.userAuth;
            const chart = request.body;
            chart.chartData = await chartService.createMultiValueComponentWeightByFoodChart(userAuth, chart.selectedComponent, chart.selectedFood, chart.startDate, chart.endDate);
            logger_1.default.info("Successfully created multi component weight by food chart");
            response.status(200).json(JSON.stringify(chart));
        }
        catch (error) {
            logger_1.default.error("Error creating multi component weight by food chart for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
}
exports.ChartControllerImpl = ChartControllerImpl;
