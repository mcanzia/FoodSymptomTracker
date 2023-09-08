import { expect, beforeEach, afterEach, describe, it, vi } from 'vitest'
import { auth } from '../../configs/firebase';
import { FoodControllerImpl } from '../../controllers/FoodControllerImpl';
import { FoodDaoImpl } from '../../dao/FoodDaoImpl';
import { FoodItem } from '../../models/FoodItem';
import { MockFoods } from '../mockData/MockFoods';
import { MockExpress } from '../mockData/MockExpress';
import { Request, Response, NextFunction } from 'express';
import { DatabaseError } from '../../util/error/CustomError';

describe('food controller method tests', () => {
  let foodController : FoodControllerImpl;

  beforeEach(async () => {
    foodController = new FoodControllerImpl();
    auth.useEmulator("http://localhost:9099/");
  })

  it('gets all foods successfully', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({});
    const response : Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const allFoodsResponse : Array<FoodItem> = MockFoods.createFoodItemArray();
    const foodDaoMock = vi.spyOn(FoodDaoImpl.prototype, "getAllFoods");
    foodDaoMock.mockImplementation(async () => allFoodsResponse);
    
    await foodController.getAllFoods(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith(JSON.stringify(allFoodsResponse));

  })

  it('handles errors gracefully during get all', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({});
    const response : Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Retrieving Foods");
    const foodDaoMock = vi.spyOn(FoodDaoImpl.prototype, "getAllFoods");
    foodDaoMock.mockRejectedValue(mockError);
    
    await foodController.getAllFoods(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('gets a food item by id successfully', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({
      params: {
        foodId: '1'
      }
    });
    const response : Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const foodItemResponse : FoodItem = MockFoods.createFoodItem();
    const foodDaoMock = vi.spyOn(FoodDaoImpl.prototype, "getFoodById");
    foodDaoMock.mockImplementation(async () => foodItemResponse);
    
    await foodController.getFoodById(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.json).toBeCalledWith(JSON.stringify(foodItemResponse));

  })

  it('handles errors gracefully during get by id', async () => {    
    const request: Partial<Request> = MockExpress.mockRequest({
      params: {
        foodId: '1'
      }
    });
    const response : Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Retrieving Foods");
    const foodDaoMock = vi.spyOn(FoodDaoImpl.prototype, "getFoodById");
    foodDaoMock.mockRejectedValue(mockError);
    
    await foodController.getFoodById(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);
  })

  it('adds food items successfully', async () => {    
    const foodItemRequest : Array<FoodItem> = MockFoods.createFoodItemArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, {foodItemRequest});
    const response : Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const foodDaoMock = vi.spyOn(FoodDaoImpl.prototype, "addFoods");
    foodDaoMock.mockImplementation(async () => {});
    
    await foodController.addFoods(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.send).toBeCalledWith("Success");

  })

  it('handles errors gracefully during add', async () => {    
    const foodItemRequest : Array<FoodItem> = MockFoods.createFoodItemArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, foodItemRequest);
    const response : Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Adding Foods");
    const foodDaoMock = vi.spyOn(FoodDaoImpl.prototype, "addFoods");
    foodDaoMock.mockRejectedValue(mockError);
    
    await foodController.addFoods(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);

  })

  it('deletes food items successfully', async () => {    
    const foodItemRequest : Array<FoodItem> = MockFoods.createFoodItemArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, foodItemRequest);
    const response : Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const foodDaoMock = vi.spyOn(FoodDaoImpl.prototype, "deleteFoods");
    foodDaoMock.mockImplementation(async () => {});
    
    await foodController.deleteFoods(request as Request, response as Response, next);
    expect(response.status).toBeCalledWith(200);
    expect(response.send).toBeCalledWith("Success");

  })

  it('handles errors gracefully during delete', async () => {    
    const foodItemRequest : Array<FoodItem> = MockFoods.createFoodItemArray();
    const request: Partial<Request> = MockExpress.mockRequest({}, foodItemRequest);
    const response : Partial<Response> = MockExpress.mockResponse();
    const next = vi.fn();
    const mockError = new DatabaseError("Error Deleting Foods");
    const foodDaoMock = vi.spyOn(FoodDaoImpl.prototype, "deleteFoods");
    foodDaoMock.mockRejectedValue(mockError);
    
    await foodController.deleteFoods(request as Request, response as Response, next);
    expect(response.send).toBeCalledWith(mockError);

  })

  afterEach(() => {
    vi.clearAllMocks();
  });
})