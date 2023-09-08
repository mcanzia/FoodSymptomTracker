import { FoodController } from '../controllers/FoodController';
export class FoodService {
    constructor() {
        this.foodController = new FoodController();
    }
    async getAllFoods(userAuth) {
        const allFoods = JSON.parse(await this.foodController.getAllFoods(userAuth));
        return allFoods;
    }
    async getFoodById(userAuth, foodId) {
        const food = await this.foodController.getFoodById(userAuth, foodId);
        return food;
    }
    async addFoods(userAuth, foodItems) {
        const food = await this.foodController.addFoods(userAuth, foodItems);
        return food;
    }
    async deleteFoods(userAuth, foodItems) {
        const food = await this.foodController.deleteFoods(userAuth, foodItems);
        return food;
    }
}
//# sourceMappingURL=FoodService.js.map