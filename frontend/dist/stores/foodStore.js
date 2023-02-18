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
        }
    }
});
//# sourceMappingURL=foodStore.js.map