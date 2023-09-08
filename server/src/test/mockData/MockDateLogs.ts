import { DateLog } from "../../models/DateLog";
import { MockComponents } from "./MockComponents";
import { MockFoods } from "./MockFoods";

export class MockDateLogs {

    static createDateLog() : DateLog {
        return {
          id : '1',
          date : '01/01/2022',
          dateValue : '01/01/2022',
          foodItems : MockFoods.createFoodItemArray(),
          components : MockComponents.createComponentArray()
        }
    }

    static createDateLogArray() : Array<DateLog> {
        return [
            {
              id : '1',
              date : '01/01/2022',
              dateValue : '2022-01-01T00:00:00.000Z',
              foodItems : MockFoods.createFoodItemArray(),
              components : MockComponents.createComponentArray()
            },
            {
              id : '2',
              date : '02/01/2022',
              dateValue : '2022-02-01T00:00:00.000Z',
              foodItems : MockFoods.createFoodItemArrayTwo(),
              components : MockComponents.createComponentArray()
            }
          ]
    }

    static createDateLogArrayTwo() : Array<DateLog> {
      return [
          {
            id : '3',
            date : '03/01/2022',
            dateValue : '2022-03-01T00:00:00.000Z',
            foodItems : MockFoods.createFoodItemArray(),
            components : MockComponents.createComponentArray()
          },
          {
            id : '4',
            date : '04/01/2022',
            dateValue : '2022-04-01T00:00:00.000Z',
            foodItems : MockFoods.createFoodItemArrayTwo(),
            components : MockComponents.createComponentArray()
          }
        ]
  }
}

