import { ChartController } from '../controllers/ChartController';
import { useUserStore } from '../stores/userStore';
export class ChartService {
    chartController;
    userStore;
    constructor() {
        this.chartController = new ChartController();
        this.userStore = useUserStore();
    }
    async getAllCharts() {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response = await this.chartController.getAllCharts(userAccessToken);
            const allCharts = response ? JSON.parse(response) : [];
            return allCharts;
        }
        catch (error) {
            throw error;
        }
    }
    async getChartById(chartId) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const chart = await this.chartController.getChartById(userAccessToken, chartId);
            return chart;
        }
        catch (error) {
            throw error;
        }
    }
    async addCharts(charts) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const chart = await this.chartController.addCharts(userAccessToken, charts);
            return chart;
        }
        catch (error) {
            throw error;
        }
    }
    async updateChart(chart) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            await this.chartController.updateChart(userAccessToken, chart);
        }
        catch (error) {
            throw error;
        }
    }
    async deleteCharts(charts) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const chart = await this.chartController.deleteCharts(userAccessToken, charts);
            return chart;
        }
        catch (error) {
            throw error;
        }
    }
    async createAverageChart(chart) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response = await this.chartController.createAverageChart(userAccessToken, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        }
        catch (error) {
            throw error;
        }
    }
    async createFoodValueChart(chart) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response = await this.chartController.createFoodValueChart(userAccessToken, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        }
        catch (error) {
            throw error;
        }
    }
    async createSingleValueComponentWeightByFoodChart(chart) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response = await this.chartController.createSingleValueComponentWeightByFoodChart(userAccessToken, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        }
        catch (error) {
            throw error;
        }
    }
    async createMultiValueComponentWeightByFoodChart(chart) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response = await this.chartController.createMultiValueComponentWeightByFoodChart(userAccessToken, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        }
        catch (error) {
            throw error;
        }
    }
}
//# sourceMappingURL=ChartService.js.map