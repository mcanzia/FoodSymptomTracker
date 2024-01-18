"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MockFoods = void 0;
class MockFoods {
    static createFoodItem() {
        return {
            id: '1',
            name: 'Apple'
        };
    }
    static createAllFoodItemArray() {
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
        ];
    }
    static createFoodItemArray() {
        return [
            {
                id: '1',
                name: 'Apple'
            },
            {
                id: '2',
                name: 'Banana'
            }
        ];
    }
    static createFoodItemArrayThree() {
        return [
            {
                id: '3',
                name: 'Orange'
            },
            {
                id: '4',
                name: 'Cantaloupe'
            }
        ];
    }
    static createFoodItemArrayTwo() {
        return [
            {
                id: '2',
                name: 'Banana'
            },
            {
                id: '3',
                name: 'Grape'
            }
        ];
    }
}
exports.MockFoods = MockFoods;
