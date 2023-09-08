import { NextFunction, Request, Response } from 'express';
import { DateLog } from '../models/DateLog';
import Logger from '../util/logs/logger';
import { DateLogController } from './DateLogController';
import { DateLogDaoImpl } from '../dao/DateLogDaoImpl';


export class DateLogControllerImpl {

    public dateLogDao : DateLogDaoImpl;

    // potentially look into dependency injection container frameworks
    constructor() {
        this.dateLogDao = new DateLogDaoImpl;
    }

    async getAllDateLogs(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Retrieving date logs for user: " + response.locals.userAuth);
            const dateLogDao : DateLogDaoImpl = new DateLogDaoImpl();
            const userAuth = response.locals.userAuth;
            const dateLogs : Array<DateLog> = await dateLogDao.getAllDateLogs(userAuth);
            //const dateLogs : Array<DateLog> = await dateLogDao.getDateLogsWithFood(userAuth, new FoodItem('HriRbXuQ0Koa230LBtbf', 'Grape'));
            Logger.info("Number of date logs retrieved successfully: " + dateLogs.length);
            response.status(200).json(JSON.stringify(dateLogs));
        } catch (error) {
            Logger.error("Error retrieving date logs for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async getDateLogById(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Retrieving date log for user: " + response.locals.userAuth);
            const dateLogDao : DateLogDaoImpl = new DateLogDaoImpl();
            const userAuth = response.locals.userAuth;
            const dateLogId : string = request.params.dateLogId;
            const dateLog : DateLog = await dateLogDao.getDateLogById(userAuth, dateLogId);
            Logger.info("Date log retrieved successfully: " + JSON.stringify(dateLog));
            response.status(200).json(JSON.stringify(dateLog));
        } catch (error) {
            Logger.error("Error retrieving date log for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async addDateLogs(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Adding date logs for user: " + response.locals.userAuth);
            Logger.info("Date Logs: " + JSON.stringify(request.body));
            const dateLogDao : DateLogDaoImpl = new DateLogDaoImpl();
            const userAuth = response.locals.userAuth;
            const dateLogs : Array<DateLog> = request.body;
            await dateLogDao.addDateLogs(userAuth, dateLogs);
            Logger.info("Successfully added date logs");
            response.status(200).send("Success");
        } catch (error) {
            Logger.error("Error adding date logs for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async updateDateLog(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Updating date logs for user: " + response.locals.userAuth);
            Logger.info("Date Logs: " + JSON.stringify(request.body));
            const dateLogDao : DateLogDaoImpl = new DateLogDaoImpl();
            const userAuth = response.locals.userAuth;
            const dateLogId : string = request.params.dateLogId;
            const dateLogData : DateLog = request.body;
            await dateLogDao.updateDateLogs(userAuth, dateLogId, dateLogData);
            Logger.info("Successfully updated date logs");
            response.status(200).send("Success");
        } catch (error) {
            Logger.error("Error updating date logs for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async deleteDateLogs(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Deleting date logs for user: " + response.locals.userAuth);
            Logger.info("Date Logs: " + JSON.stringify(request.body));
            const dateLogDao : DateLogDaoImpl = new DateLogDaoImpl();
            const userAuth = response.locals.userAuth;
            const dateLogs : Array<DateLog> = request.body;
            const dateLogIds : Array<string> = dateLogs.map(dateLog => dateLog.id);
            await dateLogDao.deleteDateLogs(userAuth, dateLogIds);
            Logger.info("Successfully deleted date logs");
            response.status(200).send("Success");
        } catch (error) {
            Logger.error("Error deleting date logs for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

}
