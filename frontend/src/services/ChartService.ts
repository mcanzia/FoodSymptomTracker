import { ChartController } from '../controllers/ChartController';
import { Chart } from '../models/Chart';

export class ChartService {

    private chartController : ChartController;

    constructor() {
        this.chartController = new ChartController();
    }

    async getAllCharts(userAuth : any) {
        try {
            const response = await this.chartController.getAllCharts(userAuth);
            const allCharts = response ? JSON.parse(response) : [];
            return allCharts;
        } catch (error) {
            throw error;
        }
    }

    async getChartById(userAuth : any, chartId : string) {
        try {
            const chart = await this.chartController.getChartById(userAuth, chartId);
            return chart;
        } catch (error) {
            throw error;
        }
    }

    async addCharts(userAuth : any, charts : Array<Chart>) {
        try {
            const chart = await this.chartController.addCharts(userAuth, charts);
            return chart;
        } catch (error) {
            throw error;
        }
    }

    async updateChart(userAuth : any, chart : Chart) {
        try {
            await this.chartController.updateChart(userAuth, chart);
        } catch (error) {
            throw error;
        }
    }

    async deleteCharts(userAuth : any, charts : Array<Chart>) {
        try {
            const chart = await this.chartController.deleteCharts(userAuth, charts);
            return chart;
        } catch (error) {
            throw error;
        }
    }

    async createAverageChart(userAuth : any, chart : Chart) {
        try {
            const response = await this.chartController.createAverageChart(userAuth, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        } catch (error) {
            throw error;
        }
    }

    async createFoodValueChart(userAuth : any, chart : Chart) {
        try {
            const response = await this.chartController.createFoodValueChart(userAuth, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        } catch (error) {
            throw error;
        }
    }

    async createSingleValueComponentWeightByFoodChart(userAuth : any, chart : Chart) {
        try {
            const response = await this.chartController.createSingleValueComponentWeightByFoodChart(userAuth, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        } catch (error) {
            throw error;
        }
    }

    async createMultiValueComponentWeightByFoodChart(userAuth : any, chart : Chart) {
        try {
            const response = await this.chartController.createMultiValueComponentWeightByFoodChart(userAuth, chart);
            const createdChart = response ? JSON.parse(response) : null;
            return createdChart;
        } catch (error) {
            throw error;
        }
    }
}