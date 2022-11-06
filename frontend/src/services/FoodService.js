import { FoodController } from '../controllers/FoodController';

export class FoodService {
    constructor() {
        this.foodController = new FoodController();
    }

    async getAllFoods(userAuth) {
        const allFoods = await this.foodController.getAllFoods(userAuth);
        console.log(allFoods);
        return allFoods;
    }

    async getFoodById(userAuth, foodId) {
        const food = await this.foodController.getFoodById(userAuth, foodId);
        console.log(food);
        return food;
    }

    async addFoods(userAuth, foodItems) {
        const food = await this.foodController.addFoods(userAuth, foodItems);
        console.log(food);

    }
}