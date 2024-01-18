import { FoodItem } from '../models/FoodItem';

export interface FoodDao {

    getAllFoods(authId : any) : Promise<FoodItem[]>;
    getFoodById(authId : any, foodId : string) : Promise<FoodItem>
    addFoods(authId : any, foodItems : Array<FoodItem>) : void;
    deleteFoods(authId : any, foodIds : Array<string>) : void;

}