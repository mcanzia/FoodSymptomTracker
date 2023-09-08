"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockDateLogs = void 0;
const MockComponents_1 = require("./MockComponents");
const MockFoods_1 = require("./MockFoods");
class MockDateLogs {
    static createDateLog() {
        return {
            id: '1',
            date: '01/01/2022',
            dateValue: '01/01/2022',
            foodItems: MockFoods_1.MockFoods.createFoodItemArray(),
            components: MockComponents_1.MockComponents.createComponentArray()
        };
    }
    static createDateLogArray() {
        return [
            {
                id: '1',
                date: '01/01/2022',
                dateValue: '2022-01-01T00:00:00.000Z',
                foodItems: MockFoods_1.MockFoods.createFoodItemArray(),
                components: MockComponents_1.MockComponents.createComponentArray()
            },
            {
                id: '2',
                date: '02/01/2022',
                dateValue: '2022-02-01T00:00:00.000Z',
                foodItems: MockFoods_1.MockFoods.createFoodItemArrayTwo(),
                components: MockComponents_1.MockComponents.createComponentArray()
            }
        ];
    }
    static createDateLogArrayTwo() {
        return [
            {
                id: '3',
                date: '03/01/2022',
                dateValue: '2022-03-01T00:00:00.000Z',
                foodItems: MockFoods_1.MockFoods.createFoodItemArray(),
                components: MockComponents_1.MockComponents.createComponentArray()
            },
            {
                id: '4',
                date: '04/01/2022',
                dateValue: '2022-04-01T00:00:00.000Z',
                foodItems: MockFoods_1.MockFoods.createFoodItemArrayTwo(),
                components: MockComponents_1.MockComponents.createComponentArray()
            }
        ];
    }
}
exports.MockDateLogs = MockDateLogs;
