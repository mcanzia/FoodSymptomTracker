import { ChartData } from './ChartData';
import { ChartOptions } from './ChartOptions';
import { Component } from './Component';
import { FoodItem } from './FoodItem';

export class Chart {

    id : string;
    chartTitle : string;
    chartType : string;
    chartData : ChartData;
    chartOptions : ChartOptions;
    selectedComponent : Component;
    selectedFood? : FoodItem;
    startDate? : string;
    endDate? : string;


    constructor(id : string, chartTitle : string, chartType : string, chartData : ChartData, chartOptions : ChartOptions, 
        selectedComponent : Component, selectedFood? : FoodItem, startDate? : string, endDate? : string) {
            this.id = id;
            this.chartTitle = chartTitle;
            this.chartType = chartType;
            this.chartData = chartData;
            this.chartOptions = chartOptions;
            this.selectedComponent = selectedComponent;
            this.selectedFood = selectedFood;
            this.startDate = startDate;
            this.endDate = endDate;
    }
}