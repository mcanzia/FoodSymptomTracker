import { ChartController } from '../controllers/ChartController';
import { Chart } from '../models/Chart';

export class ChartService {

    private chartController : ChartController;

    constructor() {
        this.chartController = new ChartController();
    }

    async getAllCharts(userAuth : any) {
        const allCharts = JSON.parse(await this.chartController.getAllCharts(userAuth));
        return allCharts;
    }

    async getChartById(userAuth : any, chartId : string) {
        const chart = await this.chartController.getChartById(userAuth, chartId);
        console.log(chart);
        return chart;
    }

    async addCharts(userAuth : any, charts : Array<Chart>) {
        const chart = await this.chartController.addCharts(userAuth, charts);
        return chart;
    }

    async updateChart(userAuth : any, chart : Chart) {
        await this.chartController.updateChart(userAuth, chart);
        return;
    }

    async deleteCharts(userAuth : any, charts : Array<Chart>) {
        const chart = await this.chartController.deleteCharts(userAuth, charts);
        return chart;
    }

    async createAverageChart(userAuth : any, chart : Chart) {
        const createdChart = JSON.parse(await this.chartController.createAverageChart(userAuth, chart));
        return createdChart;
    }

    async createFoodValueChart(userAuth : any, chart : Chart) {
        const createdChart = JSON.parse(await this.chartController.createFoodValueChart(userAuth, chart));
        return createdChart;
    }

    async createSingleValueComponentWeightByFoodChart(userAuth : any, chart : Chart) {
        const createdChart = JSON.parse(await this.chartController.createSingleValueComponentWeightByFoodChart(userAuth, chart));
        return createdChart;
    }

    async createMultiValueComponentWeightByFoodChart(userAuth : any, chart : Chart) {
        const createdChart = JSON.parse(await this.chartController.createMultiValueComponentWeightByFoodChart(userAuth, chart));
        return createdChart;
    }
}