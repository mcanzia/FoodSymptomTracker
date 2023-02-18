import { FoodItem } from "./FoodItem";
import { Component } from "./Component";
import { DateUtil } from "../util/DateUtil";

export class DateLog {
    
    id : string;
    date : string;
    dateValue! : string;
    foodItems : Array<FoodItem>
    components : Array<Component>

    constructor (id: string, date: string, foodItems: Array<FoodItem>, components: Array<Component>){
        this.id = id
        this.date = date
        this.dateValue = DateUtil.convertDateToUTC(new Date(date)).toISOString();
        this.foodItems = foodItems;
        this.components = components;
    }
}