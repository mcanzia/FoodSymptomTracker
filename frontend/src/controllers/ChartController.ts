import { ErrorHandler } from "../util/error/ErrorHandler";
import { Chart } from "../models/Chart";
import { ObjectType } from "../models/ObjectType";
import { RequestUtil } from "./RequestUtil";
export class ChartController {

    async getAllCharts(userAuthToken : any) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        } catch (error : any) {
            ErrorHandler.handleGetAllError<Chart>(userAuthToken, ObjectType.CHART, error);
        }
    }

    async getChartById(userAuthToken : any, chartId : string) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts/${chartId}`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        } catch (error : any) {
            ErrorHandler.handleGetByIdError<Chart>(userAuthToken, ObjectType.CHART, chartId, error);
        }
    }

    async addCharts(userAuthToken : any, charts : Array<Chart>) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, charts));
            return response;
        } catch (error : any) {
            ErrorHandler.handleAddError<Chart>(userAuthToken, ObjectType.CHART, charts, error);
        }
    }

    async updateChart(userAuthToken : any, chart : Chart) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts/${chart.id}`;
            const response = await fetch(requestUrl, RequestUtil.PUTRequestParams(userAuthToken, chart));
            return response;
        } catch (error : any) {
            ErrorHandler.handleUpdateError<Chart>(userAuthToken, ObjectType.CHART, chart, error);
        }
    }

    async deleteCharts(userAuthToken : any, charts : Array<Chart>) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts`;
            const response = await fetch(requestUrl, RequestUtil.DELETERequestParams(userAuthToken, charts));
            return response;
        } catch (error : any) {
            ErrorHandler.handleDeleteError<Chart>(userAuthToken, ObjectType.CHART, charts, error);
        }
    }

    async createAverageChart(userAuthToken : any, chart : Chart) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts/average`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, chart));
            return response.json();
        } catch (error : any) {
            ErrorHandler.handleChartError<Chart>(userAuthToken, ChartType.AVERAGE, chart, error);
        }
    }

    async createFoodValueChart(userAuthToken : any, chart : Chart) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts/food-value`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, chart));
            return response.json();
        } catch (error : any) {
            ErrorHandler.handleChartError<Chart>(userAuthToken, ChartType.FOODVALUE, chart, error);
        }
    }

    async createSingleValueComponentWeightByFoodChart(userAuthToken : any, chart : Chart) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts/single-value-component-weight-by-food`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, chart));
            return response.json();
        } catch (error : any) {
            ErrorHandler.handleChartError<Chart>(userAuthToken, ChartType.SVCWEIGHTBYFOOD, chart, error);
        }
    }

    async createMultiValueComponentWeightByFoodChart(userAuthToken : any, chart : Chart) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts/multi-value-component-weight-by-food`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, chart));
            return response.json();
        } catch (error : any) {
            ErrorHandler.handleChartError<Chart>(userAuthToken, ChartType.MVCWEIGHTBYFOOD, chart, error);
        }
    }
}
