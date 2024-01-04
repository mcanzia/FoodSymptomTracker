import { FoodController } from '../controllers/FoodController';
export class FoodService {
    foodController;
    constructor() {
        this.foodController = new FoodController();
    }
    async getAllFoods(userAuth) {
        try {
            const response = await this.foodController.getAllFoods(userAuth);
            const allFoods = response ? JSON.parse(response) : [];
            return allFoods;
        }
        catch (error) {
            throw error;
        }
    }
    async getFoodById(userAuth, foodId) {
        try {
            const food = await this.foodController.getFoodById(userAuth, foodId);
            return food;
        }
        catch (error) {
            throw error;
        }
    }
    async addFoods(userAuth, foodItems) {
        try {
            const food = await this.foodController.addFoods(userAuth, foodItems);
            return food;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteFoods(userAuth, foodItems) {
        try {
            const food = await this.foodController.deleteFoods(userAuth, foodItems);
            return food;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=FoodService.js.map