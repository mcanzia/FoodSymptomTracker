import { ChartController } from '../controllers/ChartController';
import { Chart } from '../models/Chart';
import { useUserStore } from '../stores/userStore';

export class ChartService {

    private chartController : ChartController;
    private userStore : any;

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
        } catch (error) {
            throw error;
        }
    }

    async getChartById(chartId : string) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const chart = await this.chartController.getChartById(userAccessToken, chartId);
            return chart;
        } catch (error) {
            throw error;
        }
    }

    async addCharts(charts : Array<Chart>) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const chart = await this.chartController.addCharts(userAccessToken, charts);
            return chart;
        } catch (error) {
            throw error;
        }
    }

    async updateChart(chart : Chart) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            await this.chartController.updateChart(userAccessToken, chart);
        } catch (error) {
            throw error;
        }
    }

    async deleteCharts(charts : Array<Chart>) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const chart = await this.chartController.deleteCharts(userAccessToken, charts);
            return chart;
        } catch (error) {
            throw error;
        }
    }

    async createAverageChart(chart : Chart) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response = await this.chartController.createAverageChart(userAccessToken, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        } catch (error) {
            throw error;
        }
    }

    async createFoodValueChart(chart : Chart) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response = await this.chartController.createFoodValueChart(userAccessToken, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        } catch (error) {
            throw error;
        }
    }

    async createSingleValueComponentWeightByFoodChart(chart : Chart) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response = await this.chartController.createSingleValueComponentWeightByFoodChart(userAccessToken, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        } catch (error) {
            throw error;
        }
    }

    async createMultiValueComponentWeightByFoodChart(chart : Chart) {
        try {
            const userAccessToken = await this.userStore.getAccessToken();
            const response = await this.chartController.createMultiValueComponentWeightByFoodChart(userAccessToken, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        } catch (error) {
            throw error;
        }
    }
}