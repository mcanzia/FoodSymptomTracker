import { ChartController } from '../controllers/ChartController';
export class ChartService {
    chartController;
    constructor() {
        this.chartController = new ChartController();
    }
    async getAllCharts(userAuth) {
        try {
            const response = await this.chartController.getAllCharts(userAuth);
            const allCharts = response ? JSON.parse(response) : [];
            return allCharts;
        }
        catch (error) {
            throw error;
        }
    }
    async getChartById(userAuth, chartId) {
        try {
            const chart = await this.chartController.getChartById(userAuth, chartId);
            return chart;
        }
        catch (error) {
            throw error;
        }
    }
    async addCharts(userAuth, charts) {
        try {
            const chart = await this.chartController.addCharts(userAuth, charts);
            return chart;
        }
        catch (error) {
            throw error;
        }
    }
    async updateChart(userAuth, chart) {
        try {
            await this.chartController.updateChart(userAuth, chart);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteCharts(userAuth, charts) {
        try {
            const chart = await this.chartController.deleteCharts(userAuth, charts);
            return chart;
        }
        catch (error) {
            throw error;
        }
    }
    async createAverageChart(userAuth, chart) {
        try {
            const response = await this.chartController.createAverageChart(userAuth, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        }
        catch (error) {
            throw error;
        }
    }
    async createFoodValueChart(userAuth, chart) {
        try {
            const response = await this.chartController.createFoodValueChart(userAuth, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        }
        catch (error) {
            throw error;
        }
    }
    async createSingleValueComponentWeightByFoodChart(userAuth, chart) {
        try {
            const response = await this.chartController.createSingleValueComponentWeightByFoodChart(userAuth, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        }
        catch (error) {
            throw error;
        }
    }
    async createMultiValueComponentWeightByFoodChart(userAuth, chart) {
        try {
            const response = await this.chartController.createMultiValueComponentWeightByFoodChart(userAuth, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=ChartService.js.map