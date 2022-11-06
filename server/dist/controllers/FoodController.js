"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodController = void 0;
const FoodDao_1 = require("../dao/FoodDao");
class FoodController {
    // potentially look into dependency injection container frameworks
    constructor() {
        this.foodDao = new FoodDao_1.FoodDao;
    }
    async getAllFoods(request, response, next) {
        try {
            const foodDao = new FoodDao_1.FoodDao();
            const userAuth = request.headers['user-auth'];
            const foodItems = await foodDao.getAllFoods(userAuth);
            response.status(200).json(JSON.stringify(foodItems));
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
    async getFoodById(request, response, next) {
        try {
            const foodDao = new FoodDao_1.FoodDao();
            const userAuth = request.headers['user-auth'];
            const foodId = request.params.foodId;
            const foodItem = await foodDao.getFoodById(userAuth, foodId);
            response.status(200).json(JSON.stringify(foodItem));
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
    async addFoods(request, response, next) {
        try {
            const foodDao = new FoodDao_1.FoodDao();
            const userAuth = request.headers['user-auth'];
            const foodItems = request.body;
            await foodDao.addFoods(userAuth, foodItems);
            response.status(200);
        }
        catch (error) {
            console.log(error);
            response.send(error);
        }
    }
}
exports.FoodController = FoodController;
