import { ChartData } from '../models/ChartData';
import { Component } from '../models/Component';
import { FoodItem } from '../models/FoodItem';

export interface ChartService
{
    createAverageChart(authId : any, selectedComponent : Component, startDate? : string, endDate? : string) : Promise<ChartData>;
    createFoodValueChart(authId : any, selectedComponent : Component, selectedFood : FoodItem, startDate? : string, endDate? : string) : Promise<ChartData>;
    createSingleValueComponentWeightByFoodChart(authId : any, selectedComponent : Component, selectedFood? : FoodItem, startDate? : string, endDate? : string) : Promise<ChartData>;
    createMultiValueComponentWeightByFoodChart(authId : any, selectedComponent : Component, selectedFood? : FoodItem, startDate? : string, endDate? : string) : Promise<ChartData>;
}

