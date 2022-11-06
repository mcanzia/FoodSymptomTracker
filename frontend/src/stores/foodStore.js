import { defineStore } from 'pinia'

export const useFoodStore = defineStore('foodStore', {
    state: () => ({
        foods: []
      }),
    actions: {
        getExistingFood(foodName) {
            for(const food of this.foods) {
                if (food.name === foodName) {
                    return food;
                }
            }
            return null;
    
        }
    }
})