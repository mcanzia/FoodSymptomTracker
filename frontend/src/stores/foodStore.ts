import { FoodItem } from '@/models/FoodItem';
import { defineStore } from 'pinia'
import { FoodService } from '../services/FoodService';

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
        async initializeFoodList(userToken : any) {
            const foodService = new FoodService();
            this.foods = await foodService.getAllFoods(userToken);
        },
        async addFoods(userToken : any, foods : Array<FoodItem>) {
            const foodService = new FoodService();
            await foodService.addFoods(userToken, foods);
            await this.initializeFoodList(userToken);
        }
    }
})