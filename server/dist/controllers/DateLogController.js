"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateLogController = void 0;
const DateLogDao_1 = require("../dao/DateLogDao");
const FoodItem_1 = require("../models/FoodItem");
class DateLogController {
    // potentially look into dependency injection container frameworks
    constructor() {
        this.dateLogDao = new DateLogDao_1.DateLogDao;
    }
    async getAllDateLogs(request, response, next) {
        try {
            const dateLogDao = new DateLogDao_1.DateLogDao();
            const userAuth = request.headers['user-auth'];
            //const dateLogs : Array<DateLog> = await dateLogDao.getAllDateLogs(userAuth);
            const dateLogs = await dateLogDao.getDateLogsWithFood(userAuth, new FoodItem_1.FoodItem('HriRbXuQ0Koa230LBtbf', 'Grape'));
            response.status(200).json(JSON.stringify(dateLogs));
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
    async getDateLogById(request, response, next) {
        try {
            const dateLogDao = new DateLogDao_1.DateLogDao();
            const userAuth = request.headers['user-auth'];
            const dateLogId = request.params.dateLogId;
            const dateLog = await dateLogDao.getDateLogById(userAuth, dateLogId);
            response.status(200).json(JSON.stringify(dateLog));
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
    async addDateLogs(request, response, next) {
        try {
            const dateLogDao = new DateLogDao_1.DateLogDao();
            const userAuth = request.headers['user-auth'];
            const dateLogs = request.body;
            console.log(dateLogs);
            await dateLogDao.addDateLogs(userAuth, dateLogs);
            response.status(200);
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
    async updateDateLog(request, response, next) {
        try {
            const dateLogDao = new DateLogDao_1.DateLogDao();
            const userAuth = request.headers['user-auth'];
            const dateLogId = request.params.dateLogId;
            const dateLogData = request.body;
            await dateLogDao.updateDateLogs(userAuth, dateLogId, dateLogData);
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
}
exports.DateLogController = DateLogController;
