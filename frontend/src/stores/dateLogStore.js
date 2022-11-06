import { defineStore } from 'pinia'

export const useDateLogStore = defineStore('dateLogStore', {
    state: () => ({
        dateLogId: "",
        date: new Date(),
        foodItems: [],
        components: []
      }),
    actions: {
      containsFoodDuplicate(foodName) {
          for(const food of this.foodItems) {
              if (food.name === foodName) {
                  return true;
              }
          }
          return false;

      }
    }
})