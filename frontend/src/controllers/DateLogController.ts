import { ErrorHandler } from "../util/error/ErrorHandler";
import { DateLog } from "../models/DateLog";
import { ObjectType } from "../models/ObjectType";
import { RequestUtil } from "./RequestUtil";

export class DateLogController {
    async getAllDateLogs(userAuthToken: any) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/datelogs`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        } catch (error: any) {
            ErrorHandler.handleGetAllError<DateLog>(userAuthToken, ObjectType.DATELOG, error);
        }
    }

    async getDateLogById(userAuthToken: any, dateLogId: string) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/datelogs/${dateLogId}`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        } catch (error: any) {
            ErrorHandler.handleGetByIdError<DateLog>(userAuthToken, ObjectType.DATELOG, dateLogId, error);
        }
    }

    async addDateLogs(userAuthToken: any, dateLogs: Array<DateLog>) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/datelogs`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, dateLogs));
            return response;
        } catch (error: any) {
            ErrorHandler.handleAddError<DateLog>(userAuthToken, ObjectType.DATELOG, dateLogs, error);
        }
    }

    async updateDateLog(userAuthToken: any, dateLog: DateLog) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/datelogs/${dateLog.id}`;
            const response = await fetch(requestUrl, RequestUtil.PUTRequestParams(userAuthToken, dateLog));
            return response;
        } catch (error: any) {
            ErrorHandler.handleUpdateError<DateLog>(userAuthToken, ObjectType.DATELOG, dateLog, error);
        }
    }

    async deleteDateLogs(userAuthToken: any, dateLogs: Array<DateLog>) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/datelogs`;
            const response = await fetch(requestUrl, RequestUtil.DELETERequestParams(userAuthToken, dateLogs));
            return response;
        } catch (error: any) {
            ErrorHandler.handleDeleteError<DateLog>(userAuthToken, ObjectType.DATELOG, dateLogs, error);
        }
    }
}
