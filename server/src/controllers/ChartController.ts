import { NextFunction, Request, Response } from 'express';
import { ChartDao } from '../dao/ChartDao';
import { ChartService } from '../services/ChartService';
import { Chart } from '../models/Chart';
import { CustomError } from '../util/error/CustomError';
import Logger from '../util/logs/logger';

export interface ChartController {

    chartDao : ChartDao;

    getAllCharts(request : Request, response : Response, next : NextFunction) : void;
    getChartById(request : Request, response : Response, next : NextFunction) : void;
    addCharts(request : Request, response : Response, next : NextFunction) : void;
    updateChart(request : Request, response : Response, next : NextFunction) : void;
    deleteCharts(request : Request, response : Response, next : NextFunction) : void;

    createAverageChart(request : Request, response : Response, next : NextFunction) : void;
    createFoodValueChart(request : Request, response : Response, next : NextFunction) : void;
    createSingleValueComponentWeightByFoodChart(request : Request, response : Response, next : NextFunction): void;
    createMultiValueComponentWeightByFoodChart(request : Request, response : Response, next : NextFunction) : void;
}