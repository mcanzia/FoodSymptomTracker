"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FoodItem = void 0;
class FoodItem {
    id;
    name;
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    toObject() {
        return {
            id: this.id,
            name: this.name
        };
    }
}
exports.FoodItem = FoodItem;
