import { NextFunction, Request, Response } from 'express';
import { DateLogDao } from '../dao/DateLogDao';
import { DateLog } from '../models/DateLog';
import { FoodItem } from '../models/FoodItem';

export class DateLogController {

    public dateLogDao : DateLogDao;

    // potentially look into dependency injection container frameworks
    constructor() {
        this.dateLogDao = new DateLogDao;
    }

    async getAllDateLogs(request : Request, response : Response, next : NextFunction) {
        try {
            const dateLogDao : DateLogDao = new DateLogDao();
            const userAuth = response.locals.userAuth;
            const dateLogs : Array<DateLog> = await dateLogDao.getAllDateLogs(userAuth);
            //const dateLogs : Array<DateLog> = await dateLogDao.getDateLogsWithFood(userAuth, new FoodItem('HriRbXuQ0Koa230LBtbf', 'Grape'));
            response.status(200).json(JSON.stringify(dateLogs));
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

    async getDateLogById(request : Request, response : Response, next : NextFunction) {
        try {
            const dateLogDao : DateLogDao = new DateLogDao();
            const userAuth = response.locals.userAuth;
            const dateLogId : string = request.params.dateLogId;
            const dateLog : DateLog = await dateLogDao.getDateLogById(userAuth, dateLogId);
            response.status(200).json(JSON.stringify(dateLog));
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

    async addDateLogs(request : Request, response : Response, next : NextFunction) {
        try {
            const dateLogDao : DateLogDao = new DateLogDao();
            const userAuth = response.locals.userAuth;
            const dateLogs : Array<DateLog> = request.body;
            await dateLogDao.addDateLogs(userAuth, dateLogs);
            response.status(200);
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

    async updateDateLog(request : Request, response : Response, next : NextFunction) {
        try {
            const dateLogDao : DateLogDao = new DateLogDao();
            const userAuth = response.locals.userAuth;
            const dateLogId : string = request.params.dateLogId;
            const dateLogData : DateLog = request.body;
            await dateLogDao.updateDateLogs(userAuth, dateLogId, dateLogData);
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

}
