"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const firebase_1 = require("../../configs/firebase");
const ComponentControllerImpl_1 = require("../../controllers/ComponentControllerImpl");
const ComponentDaoImpl_1 = require("../../dao/ComponentDaoImpl");
const MockComponents_1 = require("../mockData/MockComponents");
const MockExpress_1 = require("../mockData/MockExpress");
const CustomError_1 = require("../../util/error/CustomError");
(0, vitest_1.describe)('component controller method tests', () => {
    let componentController;
    (0, vitest_1.beforeEach)(async () => {
        componentController = new ComponentControllerImpl_1.ComponentControllerImpl();
        firebase_1.auth.useEmulator("http://localhost:9099/");
    });
    (0, vitest_1.it)('gets all components successfully', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({});
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const allComponentsResponse = MockComponents_1.MockComponents.createComponentArray();
        const componentDaoMock = vitest_1.vi.spyOn(ComponentDaoImpl_1.ComponentDaoImpl.prototype, "getAllComponents");
        componentDaoMock.mockImplementation(async () => allComponentsResponse);
        await componentController.getAllComponents(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.json).toBeCalledWith(JSON.stringify(allComponentsResponse));
    });
    (0, vitest_1.it)('handles errors gracefully during get all', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({});
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Retrieving Components");
        const componentDaoMock = vitest_1.vi.spyOn(ComponentDaoImpl_1.ComponentDaoImpl.prototype, "getAllComponents");
        componentDaoMock.mockRejectedValue(mockError);
        await componentController.getAllComponents(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('gets a component item by id successfully', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                componentId: '1'
            }
        });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const componentItemResponse = MockComponents_1.MockComponents.createComponent();
        const componentDaoMock = vitest_1.vi.spyOn(ComponentDaoImpl_1.ComponentDaoImpl.prototype, "getComponentById");
        componentDaoMock.mockImplementation(async () => componentItemResponse);
        await componentController.getComponentById(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.json).toBeCalledWith(JSON.stringify(componentItemResponse));
    });
    (0, vitest_1.it)('handles errors gracefully during get by id', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                componentId: '1'
            }
        });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Retrieving Component");
        const componentDaoMock = vitest_1.vi.spyOn(ComponentDaoImpl_1.ComponentDaoImpl.prototype, "getComponentById");
        componentDaoMock.mockRejectedValue(mockError);
        await componentController.getComponentById(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('adds component items successfully', async () => {
        const componentItemRequest = MockComponents_1.MockComponents.createComponentArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, { componentItemRequest });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const componentDaoMock = vitest_1.vi.spyOn(ComponentDaoImpl_1.ComponentDaoImpl.prototype, "addComponents");
        componentDaoMock.mockImplementation(async () => { });
        await componentController.addComponents(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.send).toBeCalledWith("Success");
    });
    (0, vitest_1.it)('handles errors gracefully during add', async () => {
        const componentItemRequest = MockComponents_1.MockComponents.createComponentArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, componentItemRequest);
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Adding Components");
        const componentDaoMock = vitest_1.vi.spyOn(ComponentDaoImpl_1.ComponentDaoImpl.prototype, "addComponents");
        componentDaoMock.mockRejectedValue(mockError);
        await componentController.addComponents(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('updates component items successfully', async () => {
        const componentItemRequest = MockComponents_1.MockComponents.createComponent();
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                componentId: '1'
            }
        }, { componentItemRequest });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const componentDaoMock = vitest_1.vi.spyOn(ComponentDaoImpl_1.ComponentDaoImpl.prototype, "updateComponent");
        componentDaoMock.mockImplementation(async () => { });
        await componentController.updateComponent(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.send).toBeCalledWith("Success");
    });
    (0, vitest_1.it)('handles errors gracefully during update', async () => {
        const componentItemRequest = MockComponents_1.MockComponents.createComponent();
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                componentId: '1'
            }
        }, { componentItemRequest });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Updating Components");
        const componentDaoMock = vitest_1.vi.spyOn(ComponentDaoImpl_1.ComponentDaoImpl.prototype, "updateComponent");
        componentDaoMock.mockRejectedValue(mockError);
        await componentController.updateComponent(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('deletes component items successfully', async () => {
        const componentItemRequest = MockComponents_1.MockComponents.createComponentArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, componentItemRequest);
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const componentDaoMock = vitest_1.vi.spyOn(ComponentDaoImpl_1.ComponentDaoImpl.prototype, "deleteComponents");
        componentDaoMock.mockImplementation(async () => { });
        await componentController.deleteComponents(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.send).toBeCalledWith("Success");
    });
    (0, vitest_1.it)('handles errors gracefully during delete', async () => {
        const componentItemRequest = MockComponents_1.MockComponents.createComponentArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, componentItemRequest);
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Deleting Components");
        const componentDaoMock = vitest_1.vi.spyOn(ComponentDaoImpl_1.ComponentDaoImpl.prototype, "deleteComponents");
        componentDaoMock.mockRejectedValue(mockError);
        await componentController.deleteComponents(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
});
