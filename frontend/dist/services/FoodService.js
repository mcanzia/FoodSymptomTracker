import { FoodController } from '../controllers/FoodController';
import { useUserStore } from '../stores/userStore';
export class FoodService {
    foodController;
    userStore;
    constructor() {
        this.foodController = new FoodController();
        this.userStore = useUserStore();
    }
    async getAllFoods() {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response = await this.foodController.getAllFoods(userAccessToken);
            const allFoods = response ? JSON.parse(response) : [];
            return allFoods;
        }
        catch (error) {
            throw error;
        }
    }
    async getFoodById(foodId) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const food = await this.foodController.getFoodById(userAccessToken, foodId);
            return food;
        }
        catch (error) {
            throw error;
        }
    }
    async addFoods(foodItems) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const food = await this.foodController.addFoods(userAccessToken, foodItems);
            return food;
        }
        catch (error) {
            throw error;
        }
    }
    async deleteFoods(foodItems) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const food = await this.foodController.deleteFoods(userAccessToken, foodItems);
            return food;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=FoodService.js.map