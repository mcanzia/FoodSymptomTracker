import { FoodController } from '../controllers/FoodController';
import { FoodItem } from '../models/FoodItem';

export class FoodService {

    private foodController : FoodController;

    constructor() {
        this.foodController = new FoodController();
    }

    async getAllFoods(userAuth : any) {
        const allFoods = JSON.parse(await this.foodController.getAllFoods(userAuth));
        return allFoods;
    }

    async getFoodById(userAuth : any, foodId : string) {
        const food = await this.foodController.getFoodById(userAuth, foodId);
        return food;
    }

    async addFoods(userAuth : any, foodItems : Array<FoodItem>) {
        const food = await this.foodController.addFoods(userAuth, foodItems);
        return food;
    }

    async deleteFoods(userAuth : any, foodItems : Array<FoodItem>) {
        const food = await this.foodController.deleteFoods(userAuth, foodItems);
        return food;
    }
}