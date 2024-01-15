import { ChartData } from './ChartData';
import { ChartOptions } from './ChartOptions';
import { Component } from './Component';
import { FoodItem } from './FoodItem';

export class Chart {

    id : string | null; 
    chartTitle : string | null;
    chartType : string | null;
    chartShape : string | null;
    chartData : ChartData | null;
    chartOptions : ChartOptions | null
    selectedComponent : Component | null;
    selectedFood? : FoodItem | null;
    startDate? : string | null;
    endDate? : string | null;


    constructor(id : string | null, chartTitle : string | null, chartType : string | null, chartShape : string | null, chartData : ChartData | null, chartOptions : ChartOptions | null,
        selectedComponent : Component | null, selectedFood? : FoodItem | null, startDate? : string | null, endDate? : string | null) {
            this.id = id;
            this.chartTitle = chartTitle;
            this.chartType = chartType;
            this.chartShape = chartShape;
            this.chartData = chartData;
            this.chartOptions = chartOptions;
            this.selectedComponent = selectedComponent;
            this.selectedFood = selectedFood;
            this.startDate = startDate;
            this.endDate = endDate;
    }
}