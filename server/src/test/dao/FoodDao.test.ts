import { expect, beforeEach, afterEach, describe, it, vi } from 'vitest'
import { db } from '../../configs/firebase';
import { FoodDaoImpl } from '../../dao/FoodDaoImpl';
import { FoodItem } from '../../models/FoodItem';
import { MockFoods } from '../mockData/MockFoods';
import { DatabaseError } from '../../util/error/CustomError';

describe('food dao method tests', () => {
  db.useEmulator("localhost", 8080);
  let foodDao: FoodDaoImpl;
  let authId = "ABC123";
  let mockFoodData : Array<FoodItem> = [];

  beforeEach(async () => {
    foodDao = new FoodDaoImpl();
    mockFoodData = MockFoods.createFoodItemArray();
    mockFoodData.forEach(async (food, index) => {
        await db.collection('users').doc(authId).collection('foods').doc(food.id).set(food);
    });
  })

  describe('getAllFoods', () => {
    it('gets all foods successfully', async () => {    
        const foods : Array<FoodItem> = await foodDao.getAllFoods(authId);
        expect(foods.length).toBe(2);
        expect(foods).toContainEqual(mockFoodData[0]);
        expect(foods).toContainEqual(mockFoodData[1]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving Foods") });
        await expect(foodDao.getAllFoods(authId)).rejects.toThrow(DatabaseError);
    })
  });

  describe('getFoodById', () => {
    it('gets food by id successfully', async () => {    
        const food : FoodItem = await foodDao.getFoodById(authId, mockFoodData[0].id);
        expect(food).toEqual(mockFoodData[0]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving Foods") });
        await expect(foodDao.getFoodById(authId, mockFoodData[0].id)).rejects.toThrow(DatabaseError);
    })
  });

  describe('addFoods', () => {
    const newFoodData : Array<FoodItem> = MockFoods.createFoodItemArrayThree();
    it('adds new foods successfully', async () => {    
        await foodDao.addFoods(authId, newFoodData);
        const foods : Array<FoodItem> = await foodDao.getAllFoods(authId);
        expect(foods.length).toBe(4);
    })
    it('updates existing foods successfully', async () => {    
        await foodDao.addFoods(authId, mockFoodData);
        const foods : Array<FoodItem> = await foodDao.getAllFoods(authId);
        expect(foods.length).toBe(2);
        expect(foods).toContainEqual(mockFoodData[0]);
        expect(foods).toContainEqual(mockFoodData[1]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Adding Foods") });
        await expect(foodDao.addFoods(authId, newFoodData)).rejects.toThrow(DatabaseError);
    })
  });

  describe('deleteFoods', () => {
    it('deletes foods successfully', async () => {   
        const mockFoodDataIds : Array<string> = mockFoodData.map(food => food.id);
        let foods : Array<FoodItem> = await foodDao.getAllFoods(authId); 
        expect(foods.length).toBe(2);
        expect(foods).toContainEqual(mockFoodData[0]);
        expect(foods).toContainEqual(mockFoodData[1]);
        await foodDao.deleteFoods(authId, mockFoodDataIds);
        foods = await foodDao.getAllFoods(authId);
        expect(foods.length).toBe(0);
    })
    it('handles errors gracefully', async() => {
        const mockFoodDataIds : Array<string> = mockFoodData.map(food => food.id);
        const dbMock = vi.spyOn(db, "batch");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Deleting Foods") });
        await expect(foodDao.deleteFoods(authId, mockFoodDataIds)).rejects.toThrow(DatabaseError);
    })
  });

  afterEach(async () => {
    vi.clearAllMocks();
    const foodsRef = db.collection('users').doc(authId).collection('foods');
    const snapshot = await foodsRef.get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    await batch.commit();
    await db.collection('users').doc(authId).delete();
  });
})
