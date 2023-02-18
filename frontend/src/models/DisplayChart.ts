import { ChartOptions } from './ChartOptions';
import { ChartData } from './ChartData';

export class DisplayChart {

    id: string | null;
    chartType: string | null;
    chartData: ChartData | null;
    chartOptions: ChartOptions | null;


    constructor(id : string | null, chartType : string | null, chartData : ChartData | null, chartOptions : ChartOptions | null) {
            this.id = id;
            this.chartType = chartType;
            this.chartData = chartData;
            this.chartOptions = chartOptions;
    }
}