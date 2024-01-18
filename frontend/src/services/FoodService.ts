import { FoodController } from '../controllers/FoodController';
import { FoodItem } from '../models/FoodItem';
import { useUserStore } from '../stores/userStore';

export class FoodService {

    private foodController : FoodController;
    private userStore : any;

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
        } catch (error) {
            throw error;
        }
    }

    async getFoodById(foodId : string) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const food = await this.foodController.getFoodById(userAccessToken, foodId);
            return food;
        } catch (error) {
            throw error;
        }
    }

    async addFoods(foodItems : Array<FoodItem>) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const food = await this.foodController.addFoods(userAccessToken, foodItems);
            return food;   
        } catch (error) {
            throw error;
        }
    }

    async deleteFoods(foodItems : Array<FoodItem>) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const food = await this.foodController.deleteFoods(userAccessToken, foodItems);
            return food;
        } catch (error) {
            throw error;
        }
    }
}