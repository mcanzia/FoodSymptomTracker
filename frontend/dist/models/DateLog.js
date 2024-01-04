import { DateUtil } from "../util/DateUtil";
export class DateLog {
    id;
    date;
    dateValue;
    foodItems;
    components;
    constructor(id, date, foodItems, components) {
        this.id = id;
        this.date = date;
        this.dateValue = DateUtil.convertDateToUTC(new Date(date)).toISOString();
        this.foodItems = foodItems;
        this.components = components;
    }
}
//# sourceMappingURL=DateLog.js.map