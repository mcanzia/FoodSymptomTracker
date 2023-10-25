"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const firebase_1 = require("../../configs/firebase");
const DateLogControllerImpl_1 = require("../../controllers/DateLogControllerImpl");
const DateLogDaoImpl_1 = require("../../dao/DateLogDaoImpl");
const MockDateLogs_1 = require("../mockData/MockDateLogs");
const MockExpress_1 = require("../mockData/MockExpress");
const CustomError_1 = require("../../util/error/CustomError");
(0, vitest_1.describe)('dateLog controller method tests', () => {
    let dateLogController;
    (0, vitest_1.beforeEach)(async () => {
        dateLogController = new DateLogControllerImpl_1.DateLogControllerImpl();
        firebase_1.testauth.useEmulator("http://localhost:9099/");
    });
    (0, vitest_1.it)('gets all dateLogs successfully', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({});
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const allDateLogsResponse = MockDateLogs_1.MockDateLogs.createDateLogArray();
        const dateLogDaoMock = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "getAllDateLogs");
        dateLogDaoMock.mockImplementation(async () => allDateLogsResponse);
        await dateLogController.getAllDateLogs(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.json).toBeCalledWith(JSON.stringify(allDateLogsResponse));
    });
    (0, vitest_1.it)('handles errors gracefully during get all', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({});
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Retrieving DateLogs");
        const dateLogDaoMock = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "getAllDateLogs");
        dateLogDaoMock.mockRejectedValue(mockError);
        await dateLogController.getAllDateLogs(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('gets a dateLog item by id successfully', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                dateLogId: '1'
            }
        });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const dateLogItemResponse = MockDateLogs_1.MockDateLogs.createDateLog();
        const dateLogDaoMock = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "getDateLogById");
        dateLogDaoMock.mockImplementation(async () => dateLogItemResponse);
        await dateLogController.getDateLogById(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.json).toBeCalledWith(JSON.stringify(dateLogItemResponse));
    });
    (0, vitest_1.it)('handles errors gracefully during get by id', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                dateLogId: '1'
            }
        });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Retrieving DateLog");
        const dateLogDaoMock = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "getDateLogById");
        dateLogDaoMock.mockRejectedValue(mockError);
        await dateLogController.getDateLogById(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('adds dateLog items successfully', async () => {
        const dateLogItemRequest = MockDateLogs_1.MockDateLogs.createDateLogArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, { dateLogItemRequest });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const dateLogDaoMock = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "addDateLogs");
        dateLogDaoMock.mockImplementation(async () => { });
        await dateLogController.addDateLogs(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.send).toBeCalledWith("Success");
    });
    (0, vitest_1.it)('handles errors gracefully during add', async () => {
        const dateLogItemRequest = MockDateLogs_1.MockDateLogs.createDateLogArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, dateLogItemRequest);
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Adding DateLogs");
        const dateLogDaoMock = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "addDateLogs");
        dateLogDaoMock.mockRejectedValue(mockError);
        await dateLogController.addDateLogs(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('updates dateLog items successfully', async () => {
        const dateLogItemRequest = MockDateLogs_1.MockDateLogs.createDateLog();
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                dateLogId: '1'
            }
        }, { dateLogItemRequest });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const dateLogDaoMock = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "updateDateLogs");
        dateLogDaoMock.mockImplementation(async () => { });
        await dateLogController.updateDateLog(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.send).toBeCalledWith("Success");
    });
    (0, vitest_1.it)('handles errors gracefully during update', async () => {
        const dateLogItemRequest = MockDateLogs_1.MockDateLogs.createDateLog();
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                dateLogId: '1'
            }
        }, { dateLogItemRequest });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Updating DateLogs");
        const dateLogDaoMock = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "updateDateLogs");
        dateLogDaoMock.mockRejectedValue(mockError);
        await dateLogController.updateDateLog(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('deletes dateLog items successfully', async () => {
        const dateLogItemRequest = MockDateLogs_1.MockDateLogs.createDateLogArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, dateLogItemRequest);
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const dateLogDaoMock = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "deleteDateLogs");
        dateLogDaoMock.mockImplementation(async () => { });
        await dateLogController.deleteDateLogs(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.send).toBeCalledWith("Success");
    });
    (0, vitest_1.it)('handles errors gracefully during delete', async () => {
        const dateLogItemRequest = MockDateLogs_1.MockDateLogs.createDateLogArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, dateLogItemRequest);
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Deleting DateLogs");
        const dateLogDaoMock = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "deleteDateLogs");
        dateLogDaoMock.mockRejectedValue(mockError);
        await dateLogController.deleteDateLogs(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
});
