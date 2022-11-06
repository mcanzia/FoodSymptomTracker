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
            const userAuth = request.headers['user-auth'];
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
            const userAuth = request.headers['user-auth'];
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
            const userAuth = request.headers['user-auth'];
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
            const userAuth = request.headers['user-auth'];
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
            const userAuth = request.headers['user-auth'];
            //await chartService.createAverageChart(userAuth);
        } catch (error) {
            response.send(error);
        }
    }

    async createFoodValueChart(request : Request, response : Response, next : NextFunction) {
        try {
            console.log('Food Value chart');
            const chartService : ChartService = new ChartService();
            const userAuth = request.headers['user-auth'];
            //await chartService.createFoodValueChart(userAuth);
        } catch (error) {
            response.send(error);
        }
    }

    async createComponentWeightByFoodChart(request : Request, response : Response, next : NextFunction) {
        try {
            console.log('Component weight by food chart');
            const chartService : ChartService = new ChartService();
            const userAuth = request.headers['user-auth'];
            //await chartService.createComponentWeightByFoodChart(userAuth);
        } catch (error) {
            response.send(error);
        }
    }

    async createComponentWeightByAllFoodChart(request : Request, response : Response, next : NextFunction) {
        try {
            console.log('component weight by all food chart');
            const chartService : ChartService = new ChartService();
            const userAuth = request.headers['user-auth'];
            //await chartService.createComponentWeightByAllFoodChart(userAuth);
        } catch (error) {
            response.send(error);
        }
    }
}