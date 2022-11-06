import { FoodItem } from "./FoodItem";
import { Component } from "./Component";

export class DateLog {
    
    id : string;
    date : string;
    foodItems : Array<FoodItem>
    components : Array<Component>

    constructor (id: string, date: string, foodItems: Array<FoodItem>, components: Array<Component>){
        this.id = id
        this.date = date
        this.foodItems = foodItems;
        this.components = components;
    }
}