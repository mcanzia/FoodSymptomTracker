import { NextFunction, Request, Response } from 'express';
import { FoodDao } from '../dao/FoodDao';
import { FoodItem } from '../models/FoodItem';
import Logger from '../util/logs/logger';

export interface FoodController {

    foodDao : FoodDao;

    getAllFoods(request : Request, response : Response, next : NextFunction) : void;
    getFoodById(request : Request, response : Response, next : NextFunction) : void;
    addFoods(request : Request, response : Response, next : NextFunction) : void;
    deleteFoods(request : Request, response : Response, next : NextFunction) : void;
}
