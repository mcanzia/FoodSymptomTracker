import { vi, describe, beforeEach, afterEach, test, it, expect } from "vitest";
import { ChartServiceImpl } from "../../services/ChartServiceImpl";
import { MockComponents } from "../mockData/MockComponents";
import { MockFoods } from "../mockData/MockFoods";
import { MockDateLogs } from "../mockData/MockDateLogs";
import { FoodDaoImpl } from "../../dao/FoodDaoImpl";
import { DateLogDaoImpl } from "../../dao/DateLogDaoImpl";

describe('chart service method tests', () => {
  let chartService: ChartServiceImpl;

  beforeEach(() => {
    vi.clearAllMocks();
    chartService = new ChartServiceImpl();
  });

  describe('createAverageChart', () => {
    const mockAuthId = 'testAuthId';
    const mockComponent = MockComponents.createComponent();
    const mockFoods = MockFoods.createAllFoodItemArray();
    const mockFoodDao = vi.spyOn(FoodDaoImpl.prototype, "getAllFoods");
    mockFoodDao.mockImplementation(async () => mockFoods);

    it('should create a chart with average values', async () => {
        const mockDateLogs = MockDateLogs.createDateLogArray();
        const mockDateLogDao = vi.spyOn(DateLogDaoImpl.prototype, "getAllDateLogs");
        mockDateLogDao.mockImplementation(async () => mockDateLogs);
        const result = await chartService.createAverageChart(mockAuthId, mockComponent);
        expect(result.labels).toEqual(['Apple', 'Banana', 'Grape']);
        expect(result.datasets[0].data).toEqual([5, 5, 5]);
    });
    it('should create a chart with average values with date filter', async () => {
        const startDate : string = "01/01/2022";
        const endDate : string = "01/15/2022";
        const mockDateLogs = [MockDateLogs.createDateLog()];
        const mockDateLogDao = vi.spyOn(DateLogDaoImpl.prototype, "getAllDateLogs");
        mockDateLogDao.mockImplementation(async () => mockDateLogs);
        const result = await chartService.createAverageChart(mockAuthId, mockComponent, null, startDate, endDate);
        expect(result.labels).toEqual(['Apple', 'Banana', 'Grape']);
        expect(result.datasets[0].data).toEqual([5, 5, 0]);
    });
  });
  
  describe('createFoodValueChart', () => {
    const mockAuthId = 'testAuthId';
    const mockComponent = MockComponents.createComponent();
    const mockFood = MockFoods.createFoodItem();

    it('should create a chart with food values', async () => {
        const mockDateLogs = MockDateLogs.createDateLogArray();
        const mockDateLogDao = vi.spyOn(DateLogDaoImpl.prototype, "getDateLogsWithFood");
        mockDateLogDao.mockImplementation(async () => mockDateLogs);
    
        const result = await chartService.createFoodValueChart(mockAuthId, mockComponent, mockFood);
    
        expect(result.labels).toEqual(['Jan-2022', 'Feb-2022']);
        expect(result.datasets[0].data).toEqual([5, 5]);
    });

    it('should create a chart with food values with date filter', async () => {
        const startDate : string = "01/01/2022";
        const endDate : string = "01/15/2022";
        const mockDateLogs = [MockDateLogs.createDateLog()];
        const mockDateLogDao = vi.spyOn(DateLogDaoImpl.prototype, "getDateLogsWithFood");
        mockDateLogDao.mockImplementation(async () => mockDateLogs);
    
        const result = await chartService.createFoodValueChart(mockAuthId, mockComponent, mockFood, startDate, endDate);
    
        expect(result.labels).toEqual(['Jan-2022']);
        expect(result.datasets[0].data).toEqual([5]);
    });
  });
  
  describe('createSingleValueComponentWeightByFoodChart', () => {
    const mockAuthId = 'testAuthId';
    const mockComponent = MockComponents.createComponent();
    const mockFood = MockFoods.createFoodItem();
    
    it('should create a single value chart with component weight by food', async () => {
        const mockDateLogs = MockDateLogs.createDateLogArray();
        const mockDateLogDao = vi.spyOn(DateLogDaoImpl.prototype, "getDateLogsWithFood");
        mockDateLogDao.mockImplementation(async () => mockDateLogs);
    
        const result = await chartService.createSingleValueComponentWeightByFoodChart(mockAuthId, mockComponent, mockFood);
    
        expect(result.labels).toEqual(['Option 1', 'Option 2', 'Option 3', '5']);
        expect(result.datasets[0].data).toEqual([0,0,0,NaN]);
    });
    it('should create a single value chart with component weight by food with date filter', async () => {
        const startDate : string = "01/01/2022";
        const endDate : string = "01/15/2022";
        const mockDateLogs = [MockDateLogs.createDateLog()];
        const mockDateLogDao = vi.spyOn(DateLogDaoImpl.prototype, "getDateLogsWithFood");
        mockDateLogDao.mockImplementation(async () => mockDateLogs);
    
        const result = await chartService.createSingleValueComponentWeightByFoodChart(mockAuthId, mockComponent, mockFood, startDate, endDate);
    
        expect(result.labels).toEqual(['Option 1', 'Option 2', 'Option 3', '5']);
        expect(result.datasets[0].data).toEqual([0,0,0,NaN]);
    });
  });


  describe('createMultiValueComponentWeightByFoodChart', () => {
    const mockAuthId = 'testAuthId';
    const mockComponent = MockComponents.createComponent();
    const mockFood = MockFoods.createFoodItem();

    it('should create a multi value chart with component weight by food', async () => {
        const mockDateLogs = MockDateLogs.createDateLogArray();

        const mockDateLogDao = vi.spyOn(DateLogDaoImpl.prototype, "getDateLogsWithFood");
        mockDateLogDao.mockImplementation(async () => mockDateLogs);

        const result = await chartService.createMultiValueComponentWeightByFoodChart(mockAuthId, mockComponent, mockFood);

        expect(result.labels).toEqual(['Option 1', 'Option 2', 'Option 3', 5]);
        expect(result.datasets[0].data).toEqual([0,0,0,NaN]);
    });

    it('should create a multi value chart with component weight by food with date filter', async () => {
        const startDate : string = "01/01/2022";
        const endDate : string = "01/15/2022";
        const mockDateLogs = [MockDateLogs.createDateLog()];

        const mockDateLogDao = vi.spyOn(DateLogDaoImpl.prototype, "getDateLogsWithFood");
        mockDateLogDao.mockImplementation(async () => mockDateLogs);

        const result = await chartService.createMultiValueComponentWeightByFoodChart(mockAuthId, mockComponent, mockFood, startDate, endDate);

        expect(result.labels).toEqual(['Option 1', 'Option 2', 'Option 3', 5]);
        expect(result.datasets[0].data).toEqual([0,0,0,NaN]);
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });
});
