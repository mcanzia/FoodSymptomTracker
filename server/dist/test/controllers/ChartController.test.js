"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const firebase_1 = require("../../configs/firebase");
const ChartControllerImpl_1 = require("../../controllers/ChartControllerImpl");
const ChartDaoImpl_1 = require("../../dao/ChartDaoImpl");
const MockCharts_1 = require("../mockData/MockCharts");
const MockExpress_1 = require("../mockData/MockExpress");
const CustomError_1 = require("../../util/error/CustomError");
const ChartServiceImpl_1 = require("../../services/ChartServiceImpl");
(0, vitest_1.describe)('chart controller method tests', () => {
    let chartController;
    (0, vitest_1.beforeEach)(async () => {
        chartController = new ChartControllerImpl_1.ChartControllerImpl();
        firebase_1.auth.useEmulator("http://localhost:9099/");
    });
    (0, vitest_1.it)('gets all charts successfully', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({});
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const allChartsResponse = MockCharts_1.MockCharts.createChartArray();
        const chartDaoMock = vitest_1.vi.spyOn(ChartDaoImpl_1.ChartDaoImpl.prototype, "getAllCharts");
        chartDaoMock.mockImplementation(async () => allChartsResponse);
        await chartController.getAllCharts(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.json).toBeCalledWith(JSON.stringify(allChartsResponse));
    });
    (0, vitest_1.it)('handles errors gracefully during get all', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({});
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Retrieving Charts");
        const chartDaoMock = vitest_1.vi.spyOn(ChartDaoImpl_1.ChartDaoImpl.prototype, "getAllCharts");
        chartDaoMock.mockRejectedValue(mockError);
        await chartController.getAllCharts(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('gets a chart item by id successfully', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                chartId: '1'
            }
        });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const chartItemResponse = MockCharts_1.MockCharts.createChart();
        const chartDaoMock = vitest_1.vi.spyOn(ChartDaoImpl_1.ChartDaoImpl.prototype, "getChartById");
        chartDaoMock.mockImplementation(async () => chartItemResponse);
        await chartController.getChartById(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.json).toBeCalledWith(JSON.stringify(chartItemResponse));
    });
    (0, vitest_1.it)('handles errors gracefully during get by id', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                chartId: '1'
            }
        });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Retrieving Chart");
        const chartDaoMock = vitest_1.vi.spyOn(ChartDaoImpl_1.ChartDaoImpl.prototype, "getChartById");
        chartDaoMock.mockRejectedValue(mockError);
        await chartController.getChartById(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('adds chart items successfully', async () => {
        const chartItemRequest = MockCharts_1.MockCharts.createChartArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, { chartItemRequest });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const chartDaoMock = vitest_1.vi.spyOn(ChartDaoImpl_1.ChartDaoImpl.prototype, "addCharts");
        chartDaoMock.mockImplementation(async () => { });
        await chartController.addCharts(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.send).toBeCalledWith("Success");
    });
    (0, vitest_1.it)('handles errors gracefully during add', async () => {
        const chartItemRequest = MockCharts_1.MockCharts.createChartArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, chartItemRequest);
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Adding Charts");
        const chartDaoMock = vitest_1.vi.spyOn(ChartDaoImpl_1.ChartDaoImpl.prototype, "addCharts");
        chartDaoMock.mockRejectedValue(mockError);
        await chartController.addCharts(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('updates chart items successfully', async () => {
        const chartItemRequest = MockCharts_1.MockCharts.createChart();
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                chartId: '1'
            }
        }, { chartItemRequest });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const chartDaoMock = vitest_1.vi.spyOn(ChartDaoImpl_1.ChartDaoImpl.prototype, "updateChart");
        chartDaoMock.mockImplementation(async () => { });
        await chartController.updateChart(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.send).toBeCalledWith("Success");
    });
    (0, vitest_1.it)('handles errors gracefully during update', async () => {
        const chartItemRequest = MockCharts_1.MockCharts.createChart();
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                chartId: '1'
            }
        }, { chartItemRequest });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Updating Charts");
        const chartDaoMock = vitest_1.vi.spyOn(ChartDaoImpl_1.ChartDaoImpl.prototype, "updateChart");
        chartDaoMock.mockRejectedValue(mockError);
        await chartController.updateChart(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('deletes chart items successfully', async () => {
        const chartItemRequest = MockCharts_1.MockCharts.createChartArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, chartItemRequest);
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const chartDaoMock = vitest_1.vi.spyOn(ChartDaoImpl_1.ChartDaoImpl.prototype, "deleteCharts");
        chartDaoMock.mockImplementation(async () => { });
        await chartController.deleteCharts(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.send).toBeCalledWith("Success");
    });
    (0, vitest_1.it)('handles errors gracefully during delete', async () => {
        const chartItemRequest = MockCharts_1.MockCharts.createChartArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, chartItemRequest);
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Deleting Charts");
        const chartDaoMock = vitest_1.vi.spyOn(ChartDaoImpl_1.ChartDaoImpl.prototype, "deleteCharts");
        chartDaoMock.mockRejectedValue(mockError);
        await chartController.deleteCharts(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.describe)('creates average chart', () => {
        (0, vitest_1.it)('creates chart successfully', async () => {
            const chartItemRequest = MockCharts_1.MockCharts.createChart();
            const request = MockExpress_1.MockExpress.mockRequest({}, { chartItemRequest });
            const response = MockExpress_1.MockExpress.mockResponse();
            const next = vitest_1.vi.fn();
            const chartServiceMock = vitest_1.vi.spyOn(ChartServiceImpl_1.ChartServiceImpl.prototype, "createAverageChart");
            chartServiceMock.mockImplementation(async () => await MockCharts_1.MockCharts.createChartData());
            await chartController.createAverageChart(request, response, next);
            (0, vitest_1.expect)(response.status).toBeCalledWith(200);
            (0, vitest_1.expect)(response.json).toBeCalledWith(JSON.stringify(chartItemRequest));
        });
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
});
