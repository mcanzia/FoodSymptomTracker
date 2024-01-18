export class Chart {
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
}
//# sourceMappingURL=Chart.js.map