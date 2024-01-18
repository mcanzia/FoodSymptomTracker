"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodService = void 0;
const FoodDao_1 = require("../dao/FoodDao");
class FoodService {
    constructor() {
        this.foodDao = new FoodDao_1.FoodDao();
    }
    async getAllFoods(userAuth) {
        const foodItems = await this.foodDao.getAllFoods(userAuth);
        return JSON.stringify(foodItems);
    }
    async getFoodById(userAuth, foodId) {
        const foodItem = await this.foodDao.getFoodById(userAuth, foodId);
        return JSON.stringify(foodItem);
    }
    async addFoods(userAuth, foodItems) {
        const result = await this.foodDao.addFoods(userAuth, foodItems);
    }
}
exports.FoodService = FoodService;
