import { ErrorHandler } from "../util/error/ErrorHandler";
import { ObjectType } from "../models/ObjectType";
import { RequestUtil } from "./RequestUtil";
export class DateLogController {
    async getAllDateLogs(userAuthToken) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/datelogs`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        }
        catch (error) {
            ErrorHandler.handleGetAllError(userAuthToken, ObjectType.DATELOG, error);
        }
    }
    async getDateLogById(userAuthToken, dateLogId) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/datelogs/${dateLogId}`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        }
        catch (error) {
            ErrorHandler.handleGetByIdError(userAuthToken, ObjectType.DATELOG, dateLogId, error);
        }
    }
    async addDateLogs(userAuthToken, dateLogs) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/datelogs`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, dateLogs));
            return response;
        }
        catch (error) {
            ErrorHandler.handleAddError(userAuthToken, ObjectType.DATELOG, dateLogs, error);
        }
    }
    async updateDateLog(userAuthToken, dateLog) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/datelogs/${dateLog.id}`;
            const response = await fetch(requestUrl, RequestUtil.PUTRequestParams(userAuthToken, dateLog));
            return response;
        }
        catch (error) {
            ErrorHandler.handleUpdateError(userAuthToken, ObjectType.DATELOG, dateLog, error);
        }
    }
    async deleteDateLogs(userAuthToken, dateLogs) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/datelogs`;
            const response = await fetch(requestUrl, RequestUtil.DELETERequestParams(userAuthToken, dateLogs));
            return response;
        }
        catch (error) {
            ErrorHandler.handleDeleteError(userAuthToken, ObjectType.DATELOG, dateLogs, error);
        }
    }
}
//# sourceMappingURL=DateLogController.js.map