import { ErrorHandler } from "../util/error/ErrorHandler";
import { ObjectType } from "../models/ObjectType";
import ChartType from "../models/ChartType";
import { RequestUtil } from "./RequestUtil";
export class ChartController {
    async getAllCharts(userAuthToken) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        }
        catch (error) {
            ErrorHandler.handleGetAllError(userAuthToken, ObjectType.CHART, error);
        }
    }
    async getChartById(userAuthToken, chartId) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts/${chartId}`;
            const response = await fetch(requestUrl, RequestUtil.GETRequestParams(userAuthToken));
            return response.json();
        }
        catch (error) {
            ErrorHandler.handleGetByIdError(userAuthToken, ObjectType.CHART, chartId, error);
        }
    }
    async addCharts(userAuthToken, charts) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, charts));
            return response;
        }
        catch (error) {
            ErrorHandler.handleAddError(userAuthToken, ObjectType.CHART, charts, error);
        }
    }
    async updateChart(userAuthToken, chart) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts/${chart.id}`;
            const response = await fetch(requestUrl, RequestUtil.PUTRequestParams(userAuthToken, chart));
            return response;
        }
        catch (error) {
            ErrorHandler.handleUpdateError(userAuthToken, ObjectType.CHART, chart, error);
        }
    }
    async deleteCharts(userAuthToken, charts) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts`;
            const response = await fetch(requestUrl, RequestUtil.DELETERequestParams(userAuthToken, charts));
            return response;
        }
        catch (error) {
            ErrorHandler.handleDeleteError(userAuthToken, ObjectType.CHART, charts, error);
        }
    }
    async createAverageChart(userAuthToken, chart) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts/average`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, chart));
            return response.json();
        }
        catch (error) {
            ErrorHandler.handleChartError(userAuthToken, ChartType.AVERAGE, chart, error);
        }
    }
    async createFoodValueChart(userAuthToken, chart) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts/food-value`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, chart));
            return response.json();
        }
        catch (error) {
            ErrorHandler.handleChartError(userAuthToken, ChartType.FOODVALUE, chart, error);
        }
    }
    async createSingleValueComponentWeightByFoodChart(userAuthToken, chart) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts/single-value-component-weight-by-food`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, chart));
            return response.json();
        }
        catch (error) {
            ErrorHandler.handleChartError(userAuthToken, ChartType.SVCWEIGHTBYFOOD, chart, error);
        }
    }
    async createMultiValueComponentWeightByFoodChart(userAuthToken, chart) {
        try {
            const requestUrl = `${RequestUtil.getAPIUrl()}/api/charts/multi-value-component-weight-by-food`;
            const response = await fetch(requestUrl, RequestUtil.POSTRequestParams(userAuthToken, chart));
            return response.json();
        }
        catch (error) {
            ErrorHandler.handleChartError(userAuthToken, ChartType.MVCWEIGHTBYFOOD, chart, error);
        }
    }
}
//# sourceMappingURL=ChartController.js.map