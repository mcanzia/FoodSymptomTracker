"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const FoodControllerImpl_1 = require("../../controllers/FoodControllerImpl");
const FoodDaoImpl_1 = require("../../dao/FoodDaoImpl");
const MockFoods_1 = require("../mockData/MockFoods");
const MockExpress_1 = require("../mockData/MockExpress");
const CustomError_1 = require("../../util/error/CustomError");
(0, vitest_1.describe)('food controller method tests', () => {
    let foodController;
    (0, vitest_1.beforeEach)(async () => {
        foodController = new FoodControllerImpl_1.FoodControllerImpl();
    });
    (0, vitest_1.it)('gets all foods successfully', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({});
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const allFoodsResponse = MockFoods_1.MockFoods.createFoodItemArray();
        const foodDaoMock = vitest_1.vi.spyOn(FoodDaoImpl_1.FoodDaoImpl.prototype, "getAllFoods");
        foodDaoMock.mockImplementation(async () => allFoodsResponse);
        await foodController.getAllFoods(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.json).toBeCalledWith(JSON.stringify(allFoodsResponse));
    });
    (0, vitest_1.it)('handles errors gracefully during get all', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({});
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Retrieving Foods");
        const foodDaoMock = vitest_1.vi.spyOn(FoodDaoImpl_1.FoodDaoImpl.prototype, "getAllFoods");
        foodDaoMock.mockRejectedValue(mockError);
        await foodController.getAllFoods(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('gets a food item by id successfully', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                foodId: '1'
            }
        });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const foodItemResponse = MockFoods_1.MockFoods.createFoodItem();
        const foodDaoMock = vitest_1.vi.spyOn(FoodDaoImpl_1.FoodDaoImpl.prototype, "getFoodById");
        foodDaoMock.mockImplementation(async () => foodItemResponse);
        await foodController.getFoodById(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.json).toBeCalledWith(JSON.stringify(foodItemResponse));
    });
    (0, vitest_1.it)('handles errors gracefully during get by id', async () => {
        const request = MockExpress_1.MockExpress.mockRequest({
            params: {
                foodId: '1'
            }
        });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Retrieving Foods");
        const foodDaoMock = vitest_1.vi.spyOn(FoodDaoImpl_1.FoodDaoImpl.prototype, "getFoodById");
        foodDaoMock.mockRejectedValue(mockError);
        await foodController.getFoodById(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('adds food items successfully', async () => {
        const foodItemRequest = MockFoods_1.MockFoods.createFoodItemArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, { foodItemRequest });
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const foodDaoMock = vitest_1.vi.spyOn(FoodDaoImpl_1.FoodDaoImpl.prototype, "addFoods");
        foodDaoMock.mockImplementation(async () => { });
        await foodController.addFoods(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.send).toBeCalledWith("Success");
    });
    (0, vitest_1.it)('handles errors gracefully during add', async () => {
        const foodItemRequest = MockFoods_1.MockFoods.createFoodItemArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, foodItemRequest);
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Adding Foods");
        const foodDaoMock = vitest_1.vi.spyOn(FoodDaoImpl_1.FoodDaoImpl.prototype, "addFoods");
        foodDaoMock.mockRejectedValue(mockError);
        await foodController.addFoods(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.it)('deletes food items successfully', async () => {
        const foodItemRequest = MockFoods_1.MockFoods.createFoodItemArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, foodItemRequest);
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const foodDaoMock = vitest_1.vi.spyOn(FoodDaoImpl_1.FoodDaoImpl.prototype, "deleteFoods");
        foodDaoMock.mockImplementation(async () => { });
        await foodController.deleteFoods(request, response, next);
        (0, vitest_1.expect)(response.status).toBeCalledWith(200);
        (0, vitest_1.expect)(response.send).toBeCalledWith("Success");
    });
    (0, vitest_1.it)('handles errors gracefully during delete', async () => {
        const foodItemRequest = MockFoods_1.MockFoods.createFoodItemArray();
        const request = MockExpress_1.MockExpress.mockRequest({}, foodItemRequest);
        const response = MockExpress_1.MockExpress.mockResponse();
        const next = vitest_1.vi.fn();
        const mockError = new CustomError_1.DatabaseError("Error Deleting Foods");
        const foodDaoMock = vitest_1.vi.spyOn(FoodDaoImpl_1.FoodDaoImpl.prototype, "deleteFoods");
        foodDaoMock.mockRejectedValue(mockError);
        await foodController.deleteFoods(request, response, next);
        (0, vitest_1.expect)(response.send).toBeCalledWith(mockError);
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
});
