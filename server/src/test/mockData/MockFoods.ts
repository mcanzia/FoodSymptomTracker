import { FoodItem } from "../../models/FoodItem";

export class MockFoods {

    static createFoodItem() : FoodItem {
        return {
            id: '1',
            name: 'Apple'
        }
    }

    static createAllFoodItemArray() : Array<FoodItem> {
      return [
        {
          id: '1',
          name: 'Apple'
        },
        {
          id: '2',
          name: 'Banana'
        },
        {
          id: '3',
          name: 'Grape'
        }
      ]
    }

    static createFoodItemArray() : Array<FoodItem> {
        return [
            {
              id: '1',
              name: 'Apple'
            },
            {
              id: '2',
              name: 'Banana'
            }
          ]
    }

    static createFoodItemArrayThree() : Array<FoodItem> {
      return [
          {
            id: '3',
            name: 'Orange'
          },
          {
            id: '4',
            name: 'Cantaloupe'
          }
        ]
  }

    static createFoodItemArrayTwo() : Array<FoodItem> {
      return [
          {
            id: '2',
            name: 'Banana'
          },
          {
            id: '3',
            name: 'Grape'
          }
        ]
  }
}

