import { ChartController } from '../controllers/ChartController';
export class ChartService {
    constructor() {
        this.chartController = new ChartController();
    }
    async getAllCharts(userAuth) {
        const allCharts = JSON.parse(await this.chartController.getAllCharts(userAuth));
        return allCharts;
    }
    async getChartById(userAuth, chartId) {
        const chart = await this.chartController.getChartById(userAuth, chartId);
        console.log(chart);
        return chart;
    }
    async addCharts(userAuth, charts) {
        const chart = await this.chartController.addCharts(userAuth, charts);
        return chart;
    }
    async updateChart(userAuth, chart) {
        await this.chartController.updateChart(userAuth, chart);
        return;
    }
    async deleteCharts(userAuth, charts) {
        const chart = await this.chartController.deleteCharts(userAuth, charts);
        return chart;
    }
    async createAverageChart(userAuth, chart) {
        const createdChart = JSON.parse(await this.chartController.createAverageChart(userAuth, chart));
        return createdChart;
    }
    async createFoodValueChart(userAuth, chart) {
        const createdChart = JSON.parse(await this.chartController.createFoodValueChart(userAuth, chart));
        return createdChart;
    }
    async createSingleValueComponentWeightByFoodChart(userAuth, chart) {
        const createdChart = JSON.parse(await this.chartController.createSingleValueComponentWeightByFoodChart(userAuth, chart));
        return createdChart;
    }
    async createMultiValueComponentWeightByFoodChart(userAuth, chart) {
        const createdChart = JSON.parse(await this.chartController.createMultiValueComponentWeightByFoodChart(userAuth, chart));
        return createdChart;
    }
}
//# sourceMappingURL=ChartService.js.map