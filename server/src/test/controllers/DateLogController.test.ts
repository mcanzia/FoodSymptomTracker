import { expect, beforeEach, afterEach, describe, it, vi } from 'vitest'
import { auth } from '../../configs/firebase';
import { DateLogControllerImpl } from '../../controllers/DateLogControllerImpl';
import { DateLogDaoImpl } from '../../dao/DateLogDaoImpl';
import { DateLog } from '../../models/DateLog';
import { MockDateLogs } from '../mockData/MockDateLogs';
import { MockExpress } from '../mockData/MockExpress';
import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from '../../util/error/CustomError';

describe('dateLog controller method tests', () => {
  let dateLogController: DateLogControllerImpl;

  beforeEach(async () => {
    dateLogController = new DateLogControllerImpl();
    auth.useEmulator("http://localhost:9099/");
  })

  it('gets all dateLogs successfully', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const allDateLogsResponse: Array<DateLog> = MockDateLogs.createDateLogArray();
    const dateLogDaoMock = vi.spyOn(DateLogDaoImpl.prototype, "getAllDateLogs");
    dateLogDaoMock.mockImplementation(async () => allDateLogsResponse);
    
    await dateLogController.getAllDateLogs(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith(JSON.stringify(allDateLogsResponse));
  })

  it('handles errors gracefully during get all', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Retrieving DateLogs");
    const dateLogDaoMock = vi.spyOn(DateLogDaoImpl.prototype, "getAllDateLogs");
    dateLogDaoMock.mockRejectedValue(mockError);
    
    await dateLogController.getAllDateLogs(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('gets a dateLog item by id successfully', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({
      params: {
        dateLogId: '1'
      }
    });
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const dateLogItemResponse: DateLog = MockDateLogs.createDateLog();
    const dateLogDaoMock = vi.spyOn(DateLogDaoImpl.prototype, "getDateLogById");
    dateLogDaoMock.mockImplementation(async () => dateLogItemResponse);
    
    await dateLogController.getDateLogById(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith(JSON.stringify(dateLogItemResponse));
  })

  it('handles errors gracefully during get by id', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({
      params: {
        dateLogId: '1'
      }
    });
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Retrieving DateLog");
    const dateLogDaoMock = vi.spyOn(DateLogDaoImpl.prototype, "getDateLogById");
    dateLogDaoMock.mockRejectedValue(mockError);
    
    await dateLogController.getDateLogById(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('adds dateLog items successfully', async () => {    
    const dateLogItemRequest: Array<DateLog> = MockDateLogs.createDateLogArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, {dateLogItemRequest});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const dateLogDaoMock = vi.spyOn(DateLogDaoImpl.prototype, "addDateLogs");
    dateLogDaoMock.mockImplementation(async () => {});
    
    await dateLogController.addDateLogs(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.send).toBeCalledWith("Success");
  })

  it('handles errors gracefully during add', async () => {    
    const dateLogItemRequest: Array<DateLog> = MockDateLogs.createDateLogArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, dateLogItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Adding DateLogs");
    const dateLogDaoMock = vi.spyOn(DateLogDaoImpl.prototype, "addDateLogs");
    dateLogDaoMock.mockRejectedValue(mockError);
    
    await dateLogController.addDateLogs(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('updates dateLog items successfully', async () => {    
    const dateLogItemRequest: DateLog = MockDateLogs.createDateLog();
    const request: Partial<Request> = MockExpress.mockRequest({
        params: {
            dateLogId: '1'
        }
    }, {dateLogItemRequest});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const dateLogDaoMock = vi.spyOn(DateLogDaoImpl.prototype, "updateDateLogs");
    dateLogDaoMock.mockImplementation(async () => {});
    
    await dateLogController.updateDateLog(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.send).toBeCalledWith("Success");
  })

  it('handles errors gracefully during update', async () => {    
    const dateLogItemRequest: DateLog = MockDateLogs.createDateLog();
    const request: Partial<Request> = MockExpress.mockRequest({
        params: {
            dateLogId: '1'
        }
    }, {dateLogItemRequest});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Updating DateLogs");
    const dateLogDaoMock = vi.spyOn(DateLogDaoImpl.prototype, "updateDateLogs");
    dateLogDaoMock.mockRejectedValue(mockError);
    
    await dateLogController.updateDateLog(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('deletes dateLog items successfully', async () => {    
    const dateLogItemRequest: Array<DateLog> = MockDateLogs.createDateLogArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, dateLogItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const dateLogDaoMock = vi.spyOn(DateLogDaoImpl.prototype, "deleteDateLogs");
    dateLogDaoMock.mockImplementation(async () => {});
    
    await dateLogController.deleteDateLogs(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.send).toBeCalledWith("Success");
  })

  it('handles errors gracefully during delete', async () => {    
    const dateLogItemRequest: Array<DateLog> = MockDateLogs.createDateLogArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, dateLogItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Deleting DateLogs");
    const dateLogDaoMock = vi.spyOn(DateLogDaoImpl.prototype, "deleteDateLogs");
    dateLogDaoMock.mockRejectedValue(mockError);
    
    await dateLogController.deleteDateLogs(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  afterEach(() => {
    vi.clearAllMocks();
  });
})
