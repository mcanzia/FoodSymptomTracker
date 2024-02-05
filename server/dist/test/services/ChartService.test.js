"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const ChartServiceImpl_1 = require("../../services/ChartServiceImpl");
const MockComponents_1 = require("../mockData/MockComponents");
const MockFoods_1 = require("../mockData/MockFoods");
const MockDateLogs_1 = require("../mockData/MockDateLogs");
const FoodDaoImpl_1 = require("../../dao/FoodDaoImpl");
const DateLogDaoImpl_1 = require("../../dao/DateLogDaoImpl");
(0, vitest_1.describe)('chart service method tests', () => {
    let chartService;
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
        chartService = new ChartServiceImpl_1.ChartServiceImpl();
    });
    (0, vitest_1.describe)('createAverageChart', () => {
        const mockAuthId = 'testAuthId';
        const mockComponent = MockComponents_1.MockComponents.createComponent();
        const mockFoods = MockFoods_1.MockFoods.createAllFoodItemArray();
        const mockFoodDao = vitest_1.vi.spyOn(FoodDaoImpl_1.FoodDaoImpl.prototype, "getAllFoods");
        mockFoodDao.mockImplementation(async () => mockFoods);
        (0, vitest_1.it)('should create a chart with average values', async () => {
            const mockDateLogs = MockDateLogs_1.MockDateLogs.createDateLogArray();
            const mockDateLogDao = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "getAllDateLogs");
            mockDateLogDao.mockImplementation(async () => mockDateLogs);
            const result = await chartService.createAverageChart(mockAuthId, mockComponent);
            (0, vitest_1.expect)(result.labels).toEqual(['Apple', 'Banana', 'Grape']);
            (0, vitest_1.expect)(result.datasets[0].data).toEqual([5, 5, 5]);
        });
        (0, vitest_1.it)('should create a chart with average values with date filter', async () => {
            const startDate = "01/01/2022";
            const endDate = "01/15/2022";
            const mockDateLogs = [MockDateLogs_1.MockDateLogs.createDateLog()];
            const mockDateLogDao = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "getAllDateLogs");
            mockDateLogDao.mockImplementation(async () => mockDateLogs);
            const result = await chartService.createAverageChart(mockAuthId, mockComponent, null, startDate, endDate);
            (0, vitest_1.expect)(result.labels).toEqual(['Apple', 'Banana', 'Grape']);
            (0, vitest_1.expect)(result.datasets[0].data).toEqual([5, 5, 0]);
        });
    });
    (0, vitest_1.describe)('createFoodValueChart', () => {
        const mockAuthId = 'testAuthId';
        const mockComponent = MockComponents_1.MockComponents.createComponent();
        const mockFood = MockFoods_1.MockFoods.createFoodItem();
        (0, vitest_1.it)('should create a chart with food values', async () => {
            const mockDateLogs = MockDateLogs_1.MockDateLogs.createDateLogArray();
            const mockDateLogDao = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "getDateLogsWithFood");
            mockDateLogDao.mockImplementation(async () => mockDateLogs);
            const result = await chartService.createFoodValueChart(mockAuthId, mockComponent, mockFood);
            (0, vitest_1.expect)(result.labels).toEqual(['Jan-2022', 'Feb-2022']);
            (0, vitest_1.expect)(result.datasets[0].data).toEqual([5, 5]);
        });
        (0, vitest_1.it)('should create a chart with food values with date filter', async () => {
            const startDate = "01/01/2022";
            const endDate = "01/15/2022";
            const mockDateLogs = [MockDateLogs_1.MockDateLogs.createDateLog()];
            const mockDateLogDao = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "getDateLogsWithFood");
            mockDateLogDao.mockImplementation(async () => mockDateLogs);
            const result = await chartService.createFoodValueChart(mockAuthId, mockComponent, mockFood, startDate, endDate);
            (0, vitest_1.expect)(result.labels).toEqual(['Jan-2022']);
            (0, vitest_1.expect)(result.datasets[0].data).toEqual([5]);
        });
    });
    (0, vitest_1.describe)('createSingleValueComponentWeightByFoodChart', () => {
        const mockAuthId = 'testAuthId';
        const mockComponent = MockComponents_1.MockComponents.createComponent();
        const mockFood = MockFoods_1.MockFoods.createFoodItem();
        (0, vitest_1.it)('should create a single value chart with component weight by food', async () => {
            const mockDateLogs = MockDateLogs_1.MockDateLogs.createDateLogArray();
            const mockDateLogDao = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "getDateLogsWithFood");
            mockDateLogDao.mockImplementation(async () => mockDateLogs);
            const result = await chartService.createSingleValueComponentWeightByFoodChart(mockAuthId, mockComponent, mockFood);
            (0, vitest_1.expect)(result.labels).toEqual(['Option 1', 'Option 2', 'Option 3', '5']);
            (0, vitest_1.expect)(result.datasets[0].data).toEqual([0, 0, 0, NaN]);
        });
        (0, vitest_1.it)('should create a single value chart with component weight by food with date filter', async () => {
            const startDate = "01/01/2022";
            const endDate = "01/15/2022";
            const mockDateLogs = [MockDateLogs_1.MockDateLogs.createDateLog()];
            const mockDateLogDao = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "getDateLogsWithFood");
            mockDateLogDao.mockImplementation(async () => mockDateLogs);
            const result = await chartService.createSingleValueComponentWeightByFoodChart(mockAuthId, mockComponent, mockFood, startDate, endDate);
            (0, vitest_1.expect)(result.labels).toEqual(['Option 1', 'Option 2', 'Option 3', '5']);
            (0, vitest_1.expect)(result.datasets[0].data).toEqual([0, 0, 0, NaN]);
        });
    });
    (0, vitest_1.describe)('createMultiValueComponentWeightByFoodChart', () => {
        const mockAuthId = 'testAuthId';
        const mockComponent = MockComponents_1.MockComponents.createComponent();
        const mockFood = MockFoods_1.MockFoods.createFoodItem();
        (0, vitest_1.it)('should create a multi value chart with component weight by food', async () => {
            const mockDateLogs = MockDateLogs_1.MockDateLogs.createDateLogArray();
            const mockDateLogDao = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "getDateLogsWithFood");
            mockDateLogDao.mockImplementation(async () => mockDateLogs);
            const result = await chartService.createMultiValueComponentWeightByFoodChart(mockAuthId, mockComponent, mockFood);
            (0, vitest_1.expect)(result.labels).toEqual(['Option 1', 'Option 2', 'Option 3', 5]);
            (0, vitest_1.expect)(result.datasets[0].data).toEqual([0, 0, 0, NaN]);
        });
        (0, vitest_1.it)('should create a multi value chart with component weight by food with date filter', async () => {
            const startDate = "01/01/2022";
            const endDate = "01/15/2022";
            const mockDateLogs = [MockDateLogs_1.MockDateLogs.createDateLog()];
            const mockDateLogDao = vitest_1.vi.spyOn(DateLogDaoImpl_1.DateLogDaoImpl.prototype, "getDateLogsWithFood");
            mockDateLogDao.mockImplementation(async () => mockDateLogs);
            const result = await chartService.createMultiValueComponentWeightByFoodChart(mockAuthId, mockComponent, mockFood, startDate, endDate);
            (0, vitest_1.expect)(result.labels).toEqual(['Option 1', 'Option 2', 'Option 3', 5]);
            (0, vitest_1.expect)(result.datasets[0].data).toEqual([0, 0, 0, NaN]);
        });
    });
    (0, vitest_1.afterEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
});
