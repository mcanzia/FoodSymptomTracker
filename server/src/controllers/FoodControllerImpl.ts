import { NextFunction, Request, Response } from 'express';
import { FoodItem } from '../models/FoodItem';
import Logger from '../util/logs/logger';
import { FoodDaoImpl } from '../dao/FoodDaoImpl';

export class FoodControllerImpl {

    public foodDao : FoodDaoImpl;

    // potentially look into dependency injection container frameworks
    constructor() {
        this.foodDao = new FoodDaoImpl;
    }

    async getAllFoods(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Retrieving foods for user: " + response.locals.userAuth);
            const foodDao : FoodDaoImpl = new FoodDaoImpl();
            const userAuth = response.locals.userAuth;
            const foodItems : Array<FoodItem> = await foodDao.getAllFoods(userAuth);
            Logger.info("Number of foods retrieved successfully: " + foodItems.length);
            response.status(200).json(JSON.stringify(foodItems));
        } catch (error) {
            Logger.error("Error retrieving foods for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async getFoodById(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Retrieving food for user: " + response.locals.userAuth);
            const foodDao : FoodDaoImpl = new FoodDaoImpl();
            const userAuth = response.locals.userAuth;
            const foodId : string = request.params.foodId;
            const foodItem : FoodItem = await foodDao.getFoodById(userAuth, foodId);
            Logger.info("Food retrieved successfully: " + JSON.stringify(foodItem));
            response.status(200).json(JSON.stringify(foodItem));
        } catch (error) {
            Logger.error("Error retrieving food for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async addFoods(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Adding foods for user: " + response.locals.userAuth);
            Logger.info("Foods: " + JSON.stringify(request.body));
            const foodDao : FoodDaoImpl = new FoodDaoImpl();
            const userAuth = response.locals.userAuth;
            const foodItems : Array<FoodItem> = request.body;
            await foodDao.addFoods(userAuth, foodItems);
            Logger.info("Successfully added foods");
            response.status(200).send('Success');
        } catch (error) {
            Logger.error("Error adding foods for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }

    async deleteFoods(request : Request, response : Response, next : NextFunction) {
        try {
            Logger.info("Deleting foods for user: " + response.locals.userAuth);
            Logger.info("Foods: " + JSON.stringify(request.body));
            const foodDao : FoodDaoImpl = new FoodDaoImpl();
            const userAuth = response.locals.userAuth;
            const foods : Array<FoodItem> = request.body;
            const foodIds : Array<string> = foods.map(food => food.id);
            await foodDao.deleteFoods(userAuth, foodIds);
            Logger.info("Successfully deleted foods");
            response.status(200).send("Success");
        } catch (error) {
            Logger.error("Error deleting foods for user " + 
                response.locals.userAuth + ": " + error);
            response.send(error);
        }
    }
}
