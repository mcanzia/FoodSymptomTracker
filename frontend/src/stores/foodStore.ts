import { FoodItem } from '../models/FoodItem';
import { defineStore } from 'pinia'
import { FoodService } from '../services/FoodService';
import { ErrorHandler } from '../util/error/ErrorHandler';

interface IFoodState {
    foods : Array<FoodItem>
}

export const useFoodStore = defineStore('foodStore', {
    state: () : IFoodState => ({
        foods: []
      }),
    actions: {
        getExistingFood(foodName : string) {
            return this.foods.find(food => food.name === foodName);
        },
        async initializeFoodList() {
            try {
                const foodService = new FoodService();
                this.foods = await foodService.getAllFoods();
            } catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async addFoods(foods : Array<FoodItem>) {
            try {
                const foodService = new FoodService();
                await foodService.addFoods(foods);
                await this.initializeFoodList();
            } catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
        async deleteFoods(foodsToDelete : Array<FoodItem>) {
            try {
                const foodService = new FoodService();
                const foodIds = foodsToDelete.map(foodToDelete => foodToDelete.id);
                await foodService.deleteFoods(foodsToDelete)
                this.foods = await this.foods.filter(food => !foodIds.includes(food.id));
            } catch (error) {
                ErrorHandler.displayGenericError();
            }
        },
    }
})