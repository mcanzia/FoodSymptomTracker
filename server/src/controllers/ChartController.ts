import { NextFunction, Request, Response } from 'express';
import { ChartDao } from '../dao/ChartDao';
import { ChartService } from '../services/ChartService';
import { Chart } from '../models/Chart';
import { CustomError } from '../util/error/CustomError';
import Logger from '../util/logs/logger';

export class ChartController {

    public chartDao : ChartDao;

    // potentially look into dependency injection container frameworks
    constructor() {
        this.chartDao = new ChartDao;
    }

    async getAllCharts(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Retrieving charts for user: " + response.locals.userAuth);
            const chartDao : ChartDao = new ChartDao();
            const userAuth = response.locals.userAuth;
            const charts : Array<Chart> = await chartDao.getAllCharts(userAuth);
            Logger.info("Number of charts retrieved successfully: " + charts.length);
            response.status(200).json(JSON.stringify(charts));
        } catch (error) {
            Logger.error("Error retrieving charts for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async getChartById(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Retrieving chart for user: " + response.locals.userAuth);
            const chartDao : ChartDao = new ChartDao();
            const userAuth = response.locals.userAuth;
            const chartId : string = request.params.chartId;
            const chart : Chart = await chartDao.getChartById(userAuth, chartId);
            Logger.info("Chart retrieved successfully: " + JSON.stringify(chart));
            response.status(200).json(JSON.stringify(chart));
        } catch (error) {
            Logger.error("Error retrieving chart for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async addCharts(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Adding charts for user: " + response.locals.userAuth);
            Logger.info("Charts: " + JSON.stringify(request.body));
            const chartDao : ChartDao = new ChartDao();
            const userAuth = response.locals.userAuth;
            const charts : Array<Chart> = request.body;
            await chartDao.addCharts(userAuth, charts);
            Logger.info("Successfully added charts");
            response.status(200);
        } catch (error) {
            Logger.error("Error adding charts for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async updateChart(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Updating charts for user: " + response.locals.userAuth);
            Logger.info("Charts: " + JSON.stringify(request.body));
            const chartDao : ChartDao = new ChartDao();
            const userAuth = response.locals.userAuth;
            const chartId : string = request.params.chartId;
            const chartData : Chart = request.body;
            await chartDao.updateChart(userAuth, chartId, chartData);
            Logger.info("Successfully updated charts");
            response.status(200);
        } catch (error) {
            Logger.error("Error updating charts for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async createAverageChart(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Creating average chart for user: " + response.locals.userAuth);
            Logger.info("Chart Details: " + JSON.stringify(request.body));
            const chartService : ChartService = new ChartService();
            const userAuth = response.locals.userAuth;
            const chart : Chart = request.body;
            chart.chartData = await chartService.createAverageChart(userAuth, chart.selectedComponent, chart.startDate, chart.endDate);
            Logger.info("Successfully created average chart");
            response.status(200).json(JSON.stringify(chart));
        } catch (error) {
            Logger.error("Error creating average chart for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async createFoodValueChart(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Creating food value chart for user: " + response.locals.userAuth);
            Logger.info("Chart Details: " + JSON.stringify(request.body));
            const chartService : ChartService = new ChartService();
            const userAuth = response.locals.userAuth;
            const chart : Chart = request.body;
            if (!chart.selectedFood) {
                throw new CustomError('No food selected');
            }
            chart.chartData = await chartService.createFoodValueChart(userAuth, chart.selectedComponent, chart.selectedFood, chart.startDate, chart.endDate);
            Logger.info("Successfully created food value chart");
            response.status(200).json(JSON.stringify(chart));
        } catch (error) {
            Logger.error("Error creating food value chart for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async createSingleValueComponentWeightByFoodChart(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Creating single component weight by food chart for user: " + response.locals.userAuth);
            Logger.info("Chart Details: " + JSON.stringify(request.body));
            const chartService : ChartService = new ChartService();
            const userAuth = response.locals.userAuth;
            const chart : Chart = request.body;
            chart.chartData = await chartService.createSingleValueComponentWeightByFoodChart(userAuth, chart.selectedComponent, chart.selectedFood, chart.startDate, chart.endDate);
            Logger.info("Successfully created single component weight by food chart");
            response.status(200).json(JSON.stringify(chart));
        } catch (error) {
            Logger.error("Error creating single component weight by food chart for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async createMultiValueComponentWeightByFoodChart(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Creating multi component weight by food chart for user: " + response.locals.userAuth);
            Logger.info("Chart Details: " + JSON.stringify(request.body));
            const chartService : ChartService = new ChartService();
            const userAuth = response.locals.userAuth;
            const chart : Chart = request.body;
            chart.chartData = await chartService.createMultiValueComponentWeightByFoodChart(userAuth, chart.selectedComponent, chart.selectedFood, chart.startDate, chart.endDate);
            Logger.info("Successfully created multi component weight by food chart");
            response.status(200).json(JSON.stringify(chart));
        } catch (error) {
            Logger.error("Error creating multi component weight by food chart for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
}