import { ChartData } from './ChartData';
import { ChartOptions } from './ChartOptions';
import { Component } from './Component';
import { FoodItem } from './FoodItem';

export class Chart {

    id : string;
    chartTitle : string;
    chartType : string;
    chartShape : string;
    chartData : ChartData;
    chartOptions : ChartOptions;
    selectedComponent : Component;
    selectedFood? : FoodItem;
    chartMaxFoods? : number | null;
    startDate? : string;
    endDate? : string;


    constructor(id : string, chartTitle : string, chartType : string, chartShape : string, chartData : ChartData, chartOptions : ChartOptions, 
        selectedComponent : Component, selectedFood? : FoodItem, chartMaxFoods? : number | null, startDate? : string, endDate? : string) {
            this.id = id;
            this.chartTitle = chartTitle;
            this.chartType = chartType;
            this.chartShape = chartShape;
            this.chartData = chartData;
            this.chartOptions = chartOptions;
            this.selectedComponent = selectedComponent;
            this.selectedFood = selectedFood;
            this.chartMaxFoods = chartMaxFoods;
            this.startDate = startDate;
            this.endDate = endDate;
    }

    toObject?() {
        return {
            id: this.id,
            chartTitle: this.chartTitle,
            chartType: this.chartType,
            chartShape: this.chartShape,
            chartData: this.chartData.toObject ? this.chartData.toObject() : this.chartData,
            chartOptions: this.chartOptions.toObject ? this.chartOptions.toObject() : this.chartOptions,
            selectedComponent: this.selectedComponent.toObject ? this.selectedComponent.toObject() : this.selectedComponent,
            selectedFood: this.selectedFood ? (this.selectedFood.toObject ? this.selectedFood.toObject() : this.selectedFood) : undefined,
            chartMaxFoods: this.chartMaxFoods,
            startDate: this.startDate,
            endDate: this.endDate
        };
    }
}