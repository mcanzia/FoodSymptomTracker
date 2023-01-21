import { NextFunction, Request, Response } from 'express';
import { ChartDao } from '../dao/ChartDao';
import { ChartService } from '../services/ChartService';
import { Chart } from '../models/Chart';

export class ChartController {

    public chartDao : ChartDao;

    // potentially look into dependency injection container frameworks
    constructor() {
        this.chartDao = new ChartDao;
    }

    async getAllCharts(request : Request, response : Response, next : NextFunction) {
        try {
            const chartDao : ChartDao = new ChartDao();
            const userAuth = response.locals.userAuth;
            const charts : Array<Chart> = await chartDao.getAllCharts(userAuth);
            response.status(200).json(JSON.stringify(charts));
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

    async getChartById(request : Request, response : Response, next : NextFunction) {
        try {
            const chartDao : ChartDao = new ChartDao();
            const userAuth = response.locals.userAuth;
            const chartId : string = request.params.chartId;
            const chart : Chart = await chartDao.getChartById(userAuth, chartId);
            response.status(200).json(JSON.stringify(chart));
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

    async addCharts(request : Request, response : Response, next : NextFunction) {
        try {
            const chartDao : ChartDao = new ChartDao();
            const userAuth = response.locals.userAuth;
            const charts : Array<Chart> = request.body;
            await chartDao.addCharts(userAuth, charts);
            response.status(200);
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

    async updateChart(request : Request, response : Response, next : NextFunction) {
        try {
            const chartDao : ChartDao = new ChartDao();
            const userAuth = response.locals.userAuth;
            const chartId : string = request.params.chartId;
            const chartData : Chart = request.body;
            await chartDao.updateChart(userAuth, chartId, chartData);
            response.status(200);
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

    async createAverageChart(request : Request, response : Response, next : NextFunction) {
        try {
            console.log('Average chart');
            const chartService : ChartService = new ChartService();
            const userAuth = response.locals.userAuth;
            const chart : Chart = request.body;
            chart.chartData = await chartService.createAverageChart(userAuth, chart.selectedComponent, chart.startDate, chart.endDate);
            response.status(200).json(JSON.stringify(chart));
        } catch (error) {
            response.send(error);
        }
    }

    async createFoodValueChart(request : Request, response : Response, next : NextFunction) {
        try {
            console.log('Food Value chart');
            const chartService : ChartService = new ChartService();
            const userAuth = response.locals.userAuth;
            const chart : Chart = request.body;
            if (!chart.selectedFood) {
                throw new Error('No food selected');
            }
            chart.chartData = await chartService.createFoodValueChart(userAuth, chart.selectedComponent, chart.selectedFood, chart.startDate, chart.endDate);
            response.status(200).json(JSON.stringify(chart));
        } catch (error) {
            response.send(error);
        }
    }

    async createSingleValueComponentWeightByFoodChart(request : Request, response : Response, next : NextFunction) {
        try {
            console.log('Component weight by food chart');
            const chartService : ChartService = new ChartService();
            const userAuth = response.locals.userAuth;
            const chart : Chart = request.body;
            chart.chartData = await chartService.createSingleValueComponentWeightByFoodChart(userAuth, chart.selectedComponent, chart.selectedFood, chart.startDate, chart.endDate);
            response.status(200).json(JSON.stringify(chart));
        } catch (error) {
            response.send(error);
        }
    }

    async createMultiValueComponentWeightByFoodChart(request : Request, response : Response, next : NextFunction) {
        try {
            console.log('component weight by all food chart');
            const chartService : ChartService = new ChartService();
            const userAuth = response.locals.userAuth;
            const chart : Chart = request.body;
            chart.chartData = await chartService.createMultiValueComponentWeightByFoodChart(userAuth, chart.selectedComponent, chart.selectedFood, chart.startDate, chart.endDate);
            response.status(200).json(JSON.stringify(chart));
        } catch (error) {
            response.send(error);
        }
    }
}