import { NextFunction, Request, Response } from 'express';
import { Chart } from '../models/Chart';
import { CustomError } from '../util/error/CustomError';
import Logger from '../util/logs/logger';
import { ChartController } from './ChartController';
import { ChartDaoImpl } from '../dao/ChartDaoImpl';
import { ChartServiceImpl } from '../services/ChartServiceImpl';

export class ChartControllerImpl {

    public chartDao : ChartDaoImpl;

    // potentially look into dependency injection container frameworks
    constructor() {
        this.chartDao = new ChartDaoImpl;
    }

    async getAllCharts(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Retrieving charts for user: " + response.locals.userAuth);
            const chartDao : ChartDaoImpl = new ChartDaoImpl();
            const chartService : ChartServiceImpl = new ChartServiceImpl();
            const userAuth = response.locals.userAuth;
            let charts : Array<Chart> = await chartDao.getAllCharts(userAuth);
            charts = await chartService.recalculateCharts(userAuth, charts) ?? charts;
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
            const chartDao : ChartDaoImpl = new ChartDaoImpl();
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
            const chartDao : ChartDaoImpl = new ChartDaoImpl();
            const userAuth = response.locals.userAuth;
            const charts : Array<Chart> = request.body;
            await chartDao.addCharts(userAuth, charts);
            Logger.info("Successfully added charts");
            response.status(200).send("Success");
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
            const chartDao : ChartDaoImpl = new ChartDaoImpl();
            const userAuth = response.locals.userAuth;
            const chartId : string = request.params.chartId;
            const chartData : Chart = request.body;
            await chartDao.updateChart(userAuth, chartId, chartData);
            Logger.info("Successfully updated charts");
            response.status(200).send("Success");
        } catch (error) {
            Logger.error("Error updating charts for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async deleteCharts(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Deleting charts for user: " + response.locals.userAuth);
            Logger.info("Charts: " + JSON.stringify(request.body));
            const chartDao : ChartDaoImpl = new ChartDaoImpl();
            const userAuth = response.locals.userAuth;
            const charts : Array<Chart> = request.body;
            const chartIds : Array<string> = charts.map(chart => chart.id);
            await chartDao.deleteCharts(userAuth, chartIds);
            Logger.info("Successfully deleted charts");
            response.status(200).send("Success");
        } catch (error) {
            Logger.error("Error deleting charts for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async createAverageChart(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Creating average chart for user: " + response.locals.userAuth);
            Logger.info("Chart Details: " + JSON.stringify(request.body));
            const chartService : ChartServiceImpl = new ChartServiceImpl();
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
            const chartService : ChartServiceImpl = new ChartServiceImpl();
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
            const chartService : ChartServiceImpl = new ChartServiceImpl();
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
            const chartService : ChartServiceImpl = new ChartServiceImpl();
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