"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateLog = void 0;
const DateUtil_1 = require("../util/DateUtil");
class DateLog {
    id;
    date;
    dateValue;
    foodItems;
    components;
    constructor(id, date, foodItems, components) {
        this.id = id;
        this.date = date;
        this.dateValue = DateUtil_1.DateUtil.convertDateToUTC(new Date(date)).toISOString();
        this.foodItems = foodItems;
        this.components = components;
    }
    toObject() {
        return {
            id: this.id,
            date: this.date,
            dateValue: this.dateValue,
            foodItems: this.foodItems.map(foodItem => foodItem.toObject ? foodItem.toObject() : foodItem),
            components: this.components.map(component => component.toObject ? component.toObject() : component)
        };
    }
}
exports.DateLog = DateLog;
