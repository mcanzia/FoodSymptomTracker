"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const firebase_1 = require("../../configs/firebase");
const FoodDaoImpl_1 = require("../../dao/FoodDaoImpl");
const MockFoods_1 = require("../mockData/MockFoods");
const CustomError_1 = require("../../util/error/CustomError");
(0, vitest_1.describe)('food dao method tests', () => {
    firebase_1.db.useEmulator("localhost", 8080);
    let foodDao;
    let authId = "ABC123";
    let mockFoodData = [];
    (0, vitest_1.beforeEach)(async () => {
        foodDao = new FoodDaoImpl_1.FoodDaoImpl();
        mockFoodData = MockFoods_1.MockFoods.createFoodItemArray();
        mockFoodData.forEach(async (food, index) => {
            await firebase_1.db.collection('users').doc(authId).collection('foods').doc(food.id).set(food);
        });
    });
    (0, vitest_1.describe)('getAllFoods', () => {
        (0, vitest_1.it)('gets all foods successfully', async () => {
            const foods = await foodDao.getAllFoods(authId);
            (0, vitest_1.expect)(foods.length).toBe(2);
            (0, vitest_1.expect)(foods).toContainEqual(mockFoodData[0]);
            (0, vitest_1.expect)(foods).toContainEqual(mockFoodData[1]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving Foods"); });
            await (0, vitest_1.expect)(foodDao.getAllFoods(authId)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('getFoodById', () => {
        (0, vitest_1.it)('gets food by id successfully', async () => {
            const food = await foodDao.getFoodById(authId, mockFoodData[0].id);
            (0, vitest_1.expect)(food).toEqual(mockFoodData[0]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving Foods"); });
            await (0, vitest_1.expect)(foodDao.getFoodById(authId, mockFoodData[0].id)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('addFoods', () => {
        const newFoodData = MockFoods_1.MockFoods.createFoodItemArrayThree();
        (0, vitest_1.it)('adds new foods successfully', async () => {
            await foodDao.addFoods(authId, newFoodData);
            const foods = await foodDao.getAllFoods(authId);
            (0, vitest_1.expect)(foods.length).toBe(4);
        });
        (0, vitest_1.it)('updates existing foods successfully', async () => {
            await foodDao.addFoods(authId, mockFoodData);
            const foods = await foodDao.getAllFoods(authId);
            (0, vitest_1.expect)(foods.length).toBe(2);
            (0, vitest_1.expect)(foods).toContainEqual(mockFoodData[0]);
            (0, vitest_1.expect)(foods).toContainEqual(mockFoodData[1]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Adding Foods"); });
            await (0, vitest_1.expect)(foodDao.addFoods(authId, newFoodData)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('deleteFoods', () => {
        (0, vitest_1.it)('deletes foods successfully', async () => {
            const mockFoodDataIds = mockFoodData.map(food => food.id);
            let foods = await foodDao.getAllFoods(authId);
            (0, vitest_1.expect)(foods.length).toBe(2);
            (0, vitest_1.expect)(foods).toContainEqual(mockFoodData[0]);
            (0, vitest_1.expect)(foods).toContainEqual(mockFoodData[1]);
            await foodDao.deleteFoods(authId, mockFoodDataIds);
            foods = await foodDao.getAllFoods(authId);
            (0, vitest_1.expect)(foods.length).toBe(0);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const mockFoodDataIds = mockFoodData.map(food => food.id);
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "batch");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Deleting Foods"); });
            await (0, vitest_1.expect)(foodDao.deleteFoods(authId, mockFoodDataIds)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.afterEach)(async () => {
        vitest_1.vi.clearAllMocks();
        const foodsRef = firebase_1.db.collection('users').doc(authId).collection('foods');
        const snapshot = await foodsRef.get();
        const batch = firebase_1.db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        await firebase_1.db.collection('users').doc(authId).delete();
    });
});
