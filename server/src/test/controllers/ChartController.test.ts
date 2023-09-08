import { expect, beforeEach, afterEach, describe, it, vi } from 'vitest'
import { auth } from '../../configs/firebase';
import { ChartControllerImpl } from '../../controllers/ChartControllerImpl';
import { ChartDaoImpl } from '../../dao/ChartDaoImpl';
import { Chart } from '../../models/Chart';
import { MockCharts } from '../mockData/MockCharts';
import { MockExpress } from '../mockData/MockExpress';
import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from '../../util/error/CustomError';
import { ChartServiceImpl } from '../../services/ChartServiceImpl';

describe('chart controller method tests', () => {
  let chartController: ChartControllerImpl;

  beforeEach(async () => {
    chartController = new ChartControllerImpl();
    auth.useEmulator("http://localhost:9099/");
  })

  it('gets all charts successfully', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const allChartsResponse: Array<Chart> = MockCharts.createChartArray();
    const chartDaoMock = vi.spyOn(ChartDaoImpl.prototype, "getAllCharts");
    chartDaoMock.mockImplementation(async () => allChartsResponse);
    
    await chartController.getAllCharts(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith(JSON.stringify(allChartsResponse));
  })

  it('handles errors gracefully during get all', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Retrieving Charts");
    const chartDaoMock = vi.spyOn(ChartDaoImpl.prototype, "getAllCharts");
    chartDaoMock.mockRejectedValue(mockError);
    
    await chartController.getAllCharts(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('gets a chart item by id successfully', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({
      params: {
        chartId: '1'
      }
    });
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const chartItemResponse: Chart = MockCharts.createChart();
    const chartDaoMock = vi.spyOn(ChartDaoImpl.prototype, "getChartById");
    chartDaoMock.mockImplementation(async () => chartItemResponse);
    
    await chartController.getChartById(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith(JSON.stringify(chartItemResponse));
  })

  it('handles errors gracefully during get by id', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({
      params: {
        chartId: '1'
      }
    });
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Retrieving Chart");
    const chartDaoMock = vi.spyOn(ChartDaoImpl.prototype, "getChartById");
    chartDaoMock.mockRejectedValue(mockError);
    
    await chartController.getChartById(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('adds chart items successfully', async () => {    
    const chartItemRequest: Array<Chart> = MockCharts.createChartArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, {chartItemRequest});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const chartDaoMock = vi.spyOn(ChartDaoImpl.prototype, "addCharts");
    chartDaoMock.mockImplementation(async () => {});
    
    await chartController.addCharts(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.send).toBeCalledWith("Success");
  })

  it('handles errors gracefully during add', async () => {    
    const chartItemRequest: Array<Chart> = MockCharts.createChartArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, chartItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Adding Charts");
    const chartDaoMock = vi.spyOn(ChartDaoImpl.prototype, "addCharts");
    chartDaoMock.mockRejectedValue(mockError);
    
    await chartController.addCharts(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('updates chart items successfully', async () => {    
    const chartItemRequest: Chart = MockCharts.createChart();
    const request: Partial<Request> = MockExpress.mockRequest({
        params: {
            chartId: '1'
        }
    }, {chartItemRequest});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const chartDaoMock = vi.spyOn(ChartDaoImpl.prototype, "updateChart");
    chartDaoMock.mockImplementation(async () => {});
    
    await chartController.updateChart(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.send).toBeCalledWith("Success");
  })

  it('handles errors gracefully during update', async () => {    
    const chartItemRequest: Chart = MockCharts.createChart();
    const request: Partial<Request> = MockExpress.mockRequest({
        params: {
            chartId: '1'
        }
    }, {chartItemRequest});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Updating Charts");
    const chartDaoMock = vi.spyOn(ChartDaoImpl.prototype, "updateChart");
    chartDaoMock.mockRejectedValue(mockError);
    
    await chartController.updateChart(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('deletes chart items successfully', async () => {    
    const chartItemRequest: Array<Chart> = MockCharts.createChartArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, chartItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const chartDaoMock = vi.spyOn(ChartDaoImpl.prototype, "deleteCharts");
    chartDaoMock.mockImplementation(async () => {});
    
    await chartController.deleteCharts(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.send).toBeCalledWith("Success");
  })

  it('handles errors gracefully during delete', async () => {    
    const chartItemRequest: Array<Chart> = MockCharts.createChartArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, chartItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Deleting Charts");
    const chartDaoMock = vi.spyOn(ChartDaoImpl.prototype, "deleteCharts");
    chartDaoMock.mockRejectedValue(mockError);
    
    await chartController.deleteCharts(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  describe('creates average chart', () => {
    const chartItemRequest: Chart = MockCharts.createChart();
    const request: Partial<Request> = MockExpress.mockRequest({}, chartItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    it('creates chart successfully', async () => {    
      const chartServiceMock = vi.spyOn(ChartServiceImpl.prototype, "createAverageChart");
      chartServiceMock.mockImplementation(async () => chartItemRequest.chartData);
      
      await chartController.createAverageChart(request as Request, response as Response, next);
      expect(response.status).toBeCalledWith(200);
      expect(response.json).toBeCalledWith(JSON.stringify(chartItemRequest));
    })
    it('handles errors gracefully', async () => {    
      const mockError = new DatabaseError("Error Creating Charts");
      const chartDaoMock = vi.spyOn(ChartServiceImpl.prototype, "createAverageChart");
      chartDaoMock.mockRejectedValue(mockError);
    
      await chartController.createAverageChart(request as Request, response as Response, next);
      expect(response.send).toBeCalledWith(mockError);
    })
  })

  describe('creates food value chart', () => {
    const chartItemRequest: Chart = MockCharts.createChart();
    const request: Partial<Request> = MockExpress.mockRequest({}, chartItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    it('creates chart successfully', async () => {    
      const chartServiceMock = vi.spyOn(ChartServiceImpl.prototype, "createFoodValueChart");
      chartServiceMock.mockImplementation(async () => chartItemRequest.chartData);
      
      await chartController.createFoodValueChart(request as Request, response as Response, next);
      expect(response.status).toBeCalledWith(200);
      expect(response.json).toBeCalledWith(JSON.stringify(chartItemRequest));
    })
    it('handles errors gracefully', async () => {    
      const mockError = new DatabaseError("Error Creating Charts");
      const chartDaoMock = vi.spyOn(ChartServiceImpl.prototype, "createFoodValueChart");
      chartDaoMock.mockRejectedValue(mockError);
    
      await chartController.createFoodValueChart(request as Request, response as Response, next);
      expect(response.send).toBeCalledWith(mockError);
    })
  })

  describe('creates single value component weight chart', () => {
    const chartItemRequest: Chart = MockCharts.createChart();
    const request: Partial<Request> = MockExpress.mockRequest({}, chartItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    it('creates chart successfully', async () => {    
      const chartServiceMock = vi.spyOn(ChartServiceImpl.prototype, "createSingleValueComponentWeightByFoodChart");
      chartServiceMock.mockImplementation(async () => chartItemRequest.chartData);
      
      await chartController.createSingleValueComponentWeightByFoodChart(request as Request, response as Response, next);
      expect(response.status).toBeCalledWith(200);
      expect(response.json).toBeCalledWith(JSON.stringify(chartItemRequest));
    })
    it('handles errors gracefully', async () => {    
      const mockError = new DatabaseError("Error Creating Charts");
      const chartDaoMock = vi.spyOn(ChartServiceImpl.prototype, "createSingleValueComponentWeightByFoodChart");
      chartDaoMock.mockRejectedValue(mockError);
    
      await chartController.createSingleValueComponentWeightByFoodChart(request as Request, response as Response, next);
      expect(response.send).toBeCalledWith(mockError);
    })
  })

  describe('creates multi value component weight chart', () => {
    const chartItemRequest: Chart = MockCharts.createChart();
    const request: Partial<Request> = MockExpress.mockRequest({}, chartItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    it('creates chart successfully', async () => {    
      const chartServiceMock = vi.spyOn(ChartServiceImpl.prototype, "createMultiValueComponentWeightByFoodChart");
      chartServiceMock.mockImplementation(async () => chartItemRequest.chartData);
      
      await chartController.createMultiValueComponentWeightByFoodChart(request as Request, response as Response, next);
      expect(response.status).toBeCalledWith(200);
      expect(response.json).toBeCalledWith(JSON.stringify(chartItemRequest));
    })
    it('handles errors gracefully', async () => {    
      const mockError = new DatabaseError("Error Creating Charts");
      const chartDaoMock = vi.spyOn(ChartServiceImpl.prototype, "createMultiValueComponentWeightByFoodChart");
      chartDaoMock.mockRejectedValue(mockError);
    
      await chartController.createMultiValueComponentWeightByFoodChart(request as Request, response as Response, next);
      expect(response.send).toBeCalledWith(mockError);
    })
  })

  afterEach(() => {
    vi.clearAllMocks();
  });
})
