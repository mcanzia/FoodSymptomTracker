"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chart = void 0;
class Chart {
    constructor(id, chartTitle, chartType, chartData, selectedComponent, selectedFood, startDate, endDate) {
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
exports.Chart = Chart;
