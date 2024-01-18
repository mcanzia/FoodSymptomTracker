"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
class Chart {
    id;
    chartTitle;
    chartType;
    chartShape;
    chartData;
    chartOptions;
    selectedComponent;
    selectedFood;
    startDate;
    endDate;
    constructor(id, chartTitle, chartType, chartShape, chartData, chartOptions, selectedComponent, selectedFood, startDate, endDate) {
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
    toObject() {
        return {
            id: this.id,
            chartTitle: this.chartTitle,
            chartType: this.chartType,
            chartShape: this.chartShape,
            chartData: this.chartData.toObject ? this.chartData.toObject() : this.chartData,
            chartOptions: this.chartOptions.toObject ? this.chartOptions.toObject() : this.chartOptions,
            selectedComponent: this.selectedComponent.toObject ? this.selectedComponent.toObject() : this.selectedComponent,
            selectedFood: this.selectedFood ? (this.selectedFood.toObject ? this.selectedFood.toObject() : this.selectedFood) : undefined,
            startDate: this.startDate,
            endDate: this.endDate
        };
    }
}
exports.Chart = Chart;
