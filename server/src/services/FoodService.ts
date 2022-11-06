import { FoodDao } from '../dao/FoodDao';
import { FoodItem } from '../models/FoodItem';

export class FoodService
{
    private foodDao : FoodDao;

    constructor() {
        this.foodDao = new FoodDao();
    }

    async getAllFoods(userAuth : any) {
        const foodItems : Array<FoodItem> = await this.foodDao.getAllFoods(userAuth);
        return JSON.stringify(foodItems);
    }

    async getFoodById(userAuth : any, foodId : string) {
        const foodItem : FoodItem = await this.foodDao.getFoodById(userAuth, foodId);
        return JSON.stringify(foodItem);
    }

    async addFoods(userAuth : any, foodItems : Array<FoodItem>) {
        const result = await this.foodDao.addFoods(userAuth, foodItems);
    }
}

