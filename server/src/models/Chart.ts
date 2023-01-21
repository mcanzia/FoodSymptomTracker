import { ChartData } from './ChartData';
import { Component } from './Component';
import { FoodItem } from './FoodItem';

export class Chart {

    id : string;
    chartTitle : string;
    chartType : string;
    chartData : ChartData;
    selectedComponent : Component;
    selectedFood? : FoodItem;
    startDate? : string;
    endDate? : string;


    constructor(id : string, chartTitle : string, chartType : string, chartData : ChartData, selectedComponent : Component, 
        selectedFood? : FoodItem, startDate? : string, endDate? : string) {
            this.id = id;
            this.chartTitle = chartTitle;
            this.chartType = chartType;
            this.selectedComponent = selectedComponent;
            this.selectedFood = selectedFood;
            this.chartData = chartData;
            this.startDate = startDate;
            this.endDate = endDate;
    }
}