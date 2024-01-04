import { FoodController } from '../controllers/FoodController';
import { FoodItem } from '../models/FoodItem';

export class FoodService {

    private foodController : FoodController;

    constructor() {
        this.foodController = new FoodController();
    }

    async getAllFoods(userAuth : any) {
        try {
            const response = await this.foodController.getAllFoods(userAuth);
            const allFoods = response ? JSON.parse(response) : [];
            return allFoods;
        } catch (error) {
            throw error;
        }
    }

    async getFoodById(userAuth : any, foodId : string) {
        try {
            const food = await this.foodController.getFoodById(userAuth, foodId);
            return food;
        } catch (error) {
            throw error;
        }
    }

    async addFoods(userAuth : any, foodItems : Array<FoodItem>) {
        try {
            const food = await this.foodController.addFoods(userAuth, foodItems);
            return food;   
        } catch (error) {
            throw error;
        }
    }

    async deleteFoods(userAuth : any, foodItems : Array<FoodItem>) {
        try {
            const food = await this.foodController.deleteFoods(userAuth, foodItems);
            return food;
        } catch (error) {
            throw error;
        }
    }
}