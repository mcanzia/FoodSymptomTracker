import { expect, beforeEach, afterEach, describe, it, vi } from 'vitest'
import { ComponentControllerImpl } from '../../controllers/ComponentControllerImpl';
import { ComponentDaoImpl } from '../../dao/ComponentDaoImpl';
import { Component } from '../../models/Component';
import { MockComponents } from '../mockData/MockComponents';
import { MockExpress } from '../mockData/MockExpress';
import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from '../../util/error/CustomError';

describe('component controller method tests', () => {
  let componentController: ComponentControllerImpl;

  beforeEach(async () => {
    componentController = new ComponentControllerImpl();
  })

  it('gets all components successfully', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const allComponentsResponse: Array<Component> = MockComponents.createComponentArray();
    const componentDaoMock = vi.spyOn(ComponentDaoImpl.prototype, "getAllComponents");
    componentDaoMock.mockImplementation(async () => allComponentsResponse);
    
    await componentController.getAllComponents(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith(JSON.stringify(allComponentsResponse));
  })

  it('handles errors gracefully during get all', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Retrieving Components");
    const componentDaoMock = vi.spyOn(ComponentDaoImpl.prototype, "getAllComponents");
    componentDaoMock.mockRejectedValue(mockError);
    
    await componentController.getAllComponents(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('gets a component item by id successfully', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({
      params: {
        componentId: '1'
      }
    });
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const componentItemResponse: Component = MockComponents.createComponent();
    const componentDaoMock = vi.spyOn(ComponentDaoImpl.prototype, "getComponentById");
    componentDaoMock.mockImplementation(async () => componentItemResponse);
    
    await componentController.getComponentById(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith(JSON.stringify(componentItemResponse));
  })

  it('handles errors gracefully during get by id', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({
      params: {
        componentId: '1'
      }
    });
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Retrieving Component");
    const componentDaoMock = vi.spyOn(ComponentDaoImpl.prototype, "getComponentById");
    componentDaoMock.mockRejectedValue(mockError);
    
    await componentController.getComponentById(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('adds component items successfully', async () => {    
    const componentItemRequest: Array<Component> = MockComponents.createComponentArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, {componentItemRequest});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const componentDaoMock = vi.spyOn(ComponentDaoImpl.prototype, "addComponents");
    componentDaoMock.mockImplementation(async () => {});
    
    await componentController.addComponents(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.send).toBeCalledWith("Success");
  })

  it('handles errors gracefully during add', async () => {    
    const componentItemRequest: Array<Component> = MockComponents.createComponentArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, componentItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Adding Components");
    const componentDaoMock = vi.spyOn(ComponentDaoImpl.prototype, "addComponents");
    componentDaoMock.mockRejectedValue(mockError);
    
    await componentController.addComponents(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('updates component items successfully', async () => {    
    const componentItemRequest: Component = MockComponents.createComponent();
    const request: Partial<Request> = MockExpress.mockRequest({
        params: {
            componentId: '1'
        }
    }, {componentItemRequest});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const componentDaoMock = vi.spyOn(ComponentDaoImpl.prototype, "updateComponent");
    componentDaoMock.mockImplementation(async () => {});
    
    await componentController.updateComponent(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.send).toBeCalledWith("Success");
  })

  it('handles errors gracefully during update', async () => {    
    const componentItemRequest: Component = MockComponents.createComponent();
    const request: Partial<Request> = MockExpress.mockRequest({
        params: {
            componentId: '1'
        }
    }, {componentItemRequest});
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Updating Components");
    const componentDaoMock = vi.spyOn(ComponentDaoImpl.prototype, "updateComponent");
    componentDaoMock.mockRejectedValue(mockError);
    
    await componentController.updateComponent(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('deletes component items successfully', async () => {    
    const componentItemRequest: Array<Component> = MockComponents.createComponentArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, componentItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const componentDaoMock = vi.spyOn(ComponentDaoImpl.prototype, "deleteComponents");
    componentDaoMock.mockImplementation(async () => {});
    
    await componentController.deleteComponents(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.send).toBeCalledWith("Success");
  })

  it('handles errors gracefully during delete', async () => {    
    const componentItemRequest: Array<Component> = MockComponents.createComponentArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, componentItemRequest);
    const response: Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Deleting Components");
    const componentDaoMock = vi.spyOn(ComponentDaoImpl.prototype, "deleteComponents");
    componentDaoMock.mockRejectedValue(mockError);
    
    await componentController.deleteComponents(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  afterEach(() => {
    vi.clearAllMocks();
  });
})
