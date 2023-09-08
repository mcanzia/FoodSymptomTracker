"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateLogControllerImpl = void 0;
const logger_1 = __importDefault(require("../util/logs/logger"));
const DateLogDaoImpl_1 = require("../dao/DateLogDaoImpl");
class DateLogControllerImpl {
    dateLogDao;
    // potentially look into dependency injection container frameworks
    constructor() {
        this.dateLogDao = new DateLogDaoImpl_1.DateLogDaoImpl;
    }
    async getAllDateLogs(request, response, next) {
        try {
            logger_1.default.info("Retrieving date logs for user: " + response.locals.userAuth);
            const dateLogDao = new DateLogDaoImpl_1.DateLogDaoImpl();
            const userAuth = response.locals.userAuth;
            const dateLogs = await dateLogDao.getAllDateLogs(userAuth);
            //const dateLogs : Array<DateLog> = await dateLogDao.getDateLogsWithFood(userAuth, new FoodItem('HriRbXuQ0Koa230LBtbf', 'Grape'));
            logger_1.default.info("Number of date logs retrieved successfully: " + dateLogs.length);
            response.status(200).json(JSON.stringify(dateLogs));
        }
        catch (error) {
            logger_1.default.error("Error retrieving date logs for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async getDateLogById(request, response, next) {
        try {
            logger_1.default.info("Retrieving date log for user: " + response.locals.userAuth);
            const dateLogDao = new DateLogDaoImpl_1.DateLogDaoImpl();
            const userAuth = response.locals.userAuth;
            const dateLogId = request.params.dateLogId;
            const dateLog = await dateLogDao.getDateLogById(userAuth, dateLogId);
            logger_1.default.info("Date log retrieved successfully: " + JSON.stringify(dateLog));
            response.status(200).json(JSON.stringify(dateLog));
        }
        catch (error) {
            logger_1.default.error("Error retrieving date log for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async addDateLogs(request, response, next) {
        try {
            logger_1.default.info("Adding date logs for user: " + response.locals.userAuth);
            logger_1.default.info("Date Logs: " + JSON.stringify(request.body));
            const dateLogDao = new DateLogDaoImpl_1.DateLogDaoImpl();
            const userAuth = response.locals.userAuth;
            const dateLogs = request.body;
            await dateLogDao.addDateLogs(userAuth, dateLogs);
            logger_1.default.info("Successfully added date logs");
            response.status(200).send("Success");
        }
        catch (error) {
            logger_1.default.error("Error adding date logs for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async updateDateLog(request, response, next) {
        try {
            logger_1.default.info("Updating date logs for user: " + response.locals.userAuth);
            logger_1.default.info("Date Logs: " + JSON.stringify(request.body));
            const dateLogDao = new DateLogDaoImpl_1.DateLogDaoImpl();
            const userAuth = response.locals.userAuth;
            const dateLogId = request.params.dateLogId;
            const dateLogData = request.body;
            await dateLogDao.updateDateLogs(userAuth, dateLogId, dateLogData);
            logger_1.default.info("Successfully updated date logs");
            response.status(200).send("Success");
        }
        catch (error) {
            logger_1.default.error("Error updating date logs for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async deleteDateLogs(request, response, next) {
        try {
            logger_1.default.info("Deleting date logs for user: " + response.locals.userAuth);
            logger_1.default.info("Date Logs: " + JSON.stringify(request.body));
            const dateLogDao = new DateLogDaoImpl_1.DateLogDaoImpl();
            const userAuth = response.locals.userAuth;
            const dateLogs = request.body;
            const dateLogIds = dateLogs.map(dateLog => dateLog.id);
            await dateLogDao.deleteDateLogs(userAuth, dateLogIds);
            logger_1.default.info("Successfully deleted date logs");
            response.status(200).send("Success");
        }
        catch (error) {
            logger_1.default.error("Error deleting date logs for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
}
exports.DateLogControllerImpl = DateLogControllerImpl;
