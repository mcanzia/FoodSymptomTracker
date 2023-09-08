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
}
exports.DateLog = DateLog;
