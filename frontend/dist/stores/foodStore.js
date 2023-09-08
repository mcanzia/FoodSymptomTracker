import { defineStore } from 'pinia';
import { FoodService } from '../services/FoodService';
export const useFoodStore = defineStore('foodStore', {
    state: () => ({
        foods: []
    }),
    actions: {
        getExistingFood(foodName) {
            return this.foods.find(food => food.name === foodName);
        },
        async initializeFoodList(userToken) {
            const foodService = new FoodService();
            this.foods = await foodService.getAllFoods(userToken);
        },
        async addFoods(userToken, foods) {
            const foodService = new FoodService();
            await foodService.addFoods(userToken, foods);
            await this.initializeFoodList(userToken);
        },
        async deleteFoods(userToken, foodsToDelete) {
            const foodService = new FoodService();
            const foodIds = foodsToDelete.map(foodToDelete => foodToDelete.id);
            this.foods = await this.foods.filter(food => !foodIds.includes(food.id));
            await foodService.deleteFoods(userToken, foodsToDelete);
        },
    }
});
//# sourceMappingURL=foodStore.js.map