"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodController = void 0;
const FoodDao_1 = require("../dao/FoodDao");
const logger_1 = __importDefault(require("../util/logs/logger"));
class FoodController {
    // potentially look into dependency injection container frameworks
    constructor() {
        this.foodDao = new FoodDao_1.FoodDao;
    }
    async getAllFoods(request, response, next) {
        try {
            logger_1.default.info("Retrieving foods for user: " + response.locals.userAuth);
            const foodDao = new FoodDao_1.FoodDao();
            const userAuth = response.locals.userAuth;
            const foodItems = await foodDao.getAllFoods(userAuth);
            logger_1.default.info("Number of foods retrieved successfully: " + foodItems.length);
            response.status(200).json(JSON.stringify(foodItems));
        }
        catch (error) {
            logger_1.default.error("Error retrieving foods for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async getFoodById(request, response, next) {
        try {
            logger_1.default.info("Retrieving food for user: " + response.locals.userAuth);
            const foodDao = new FoodDao_1.FoodDao();
            const userAuth = response.locals.userAuth;
            const foodId = request.params.foodId;
            const foodItem = await foodDao.getFoodById(userAuth, foodId);
            logger_1.default.info("Food retrieved successfully: " + JSON.stringify(foodItem));
            response.status(200).json(JSON.stringify(foodItem));
        }
        catch (error) {
            logger_1.default.error("Error retrieving food for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
    async addFoods(request, response, next) {
        try {
            logger_1.default.info("Adding foods for user: " + response.locals.userAuth);
            logger_1.default.info("Foods: " + JSON.stringify(request.body));
            const foodDao = new FoodDao_1.FoodDao();
            const userAuth = response.locals.userAuth;
            const foodItems = request.body;
            await foodDao.addFoods(userAuth, foodItems);
            logger_1.default.info("Successfully added foods");
            response.status(200).send('Success');
        }
        catch (error) {
            logger_1.default.error("Error adding foods for user " +
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
}
exports.FoodController = FoodController;
