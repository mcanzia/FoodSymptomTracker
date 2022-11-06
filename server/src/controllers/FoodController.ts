import { NextFunction, Request, Response } from 'express';
import { FoodDao } from '../dao/FoodDao';
import { FoodItem } from '../models/FoodItem';

export class FoodController {

    public foodDao : FoodDao;

    // potentially look into dependency injection container frameworks
    constructor() {
        this.foodDao = new FoodDao;
    }

    async getAllFoods(request : Request, response : Response, next : NextFunction) {
        try {
            const foodDao : FoodDao = new FoodDao();
            const userAuth = request.headers['user-auth'];
            const foodItems : Array<FoodItem> = await foodDao.getAllFoods(userAuth);
            response.status(200).json(JSON.stringify(foodItems));
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

    async getFoodById(request : Request, response : Response, next : NextFunction) {
        try {
            const foodDao : FoodDao = new FoodDao();
            const userAuth = request.headers['user-auth'];
            const foodId : string = request.params.foodId;
            const foodItem : FoodItem = await foodDao.getFoodById(userAuth, foodId);
            response.status(200).json(JSON.stringify(foodItem));
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

    async addFoods(request : Request, response : Response, next : NextFunction) {
        try {
            const foodDao : FoodDao = new FoodDao();
            const userAuth = request.headers['user-auth'];
            const foodItems : Array<FoodItem> = request.body;
            await foodDao.addFoods(userAuth, foodItems);
            response.status(200);
        } catch (error) {
            console.log(error);
            response.send(error);
        }
    }

}
