import { defineStore } from 'pinia';
import { FoodService } from '../services/FoodService';
import { ErrorHandler } from '../util/error/ErrorHandler';
export const useFoodStore = defineStore('foodStore', {
    state: () => ({
        foods: []
    }),
    actions: {
        getExistingFood(foodName) {
            return this.foods.find(food => food.name === foodName);
        },
        async initializeFoodList(userToken) {
            try {
                const foodService = new FoodService();
                this.foods = await foodService.getAllFoods(userToken);
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async addFoods(userToken, foods) {
            try {
                const foodService = new FoodService();
                await foodService.addFoods(userToken, foods);
                await this.initializeFoodList(userToken);
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async deleteFoods(userToken, foodsToDelete) {
            try {
                const foodService = new FoodService();
                const foodIds = foodsToDelete.map(foodToDelete => foodToDelete.id);
                await foodService.deleteFoods(userToken, foodsToDelete);
                this.foods = await this.foods.filter(food => !foodIds.includes(food.id));
            }
            catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
    }
});
//# sourceMappingURL=foodStore.js.map