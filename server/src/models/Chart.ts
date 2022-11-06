import { ChartData } from './ChartData';

export class Chart {

    id : string;
    chartTitle : string;
    chartType : string;
    chartData : ChartData;

    constructor(id : string, chartTitle : string, chartType : string, chartData : ChartData) {
        this.id = id;
        this.chartTitle = chartTitle;
        this.chartType = chartType;
        this.chartData = chartData;
    }
}