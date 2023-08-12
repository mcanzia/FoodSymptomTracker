import { defineStore } from 'pinia';
import { ChartService } from '../services/ChartService';
import { Chart } from '../models/Chart';
import { ChartOptions } from '../models/ChartOptions';
export const useChartStore = defineStore('chartStore', {
    state: () => ({
        charts: [],
        newChartDetails: new Chart(null, "", "", null, null, null, null, "", "")
    }),
    actions: {
        async createAverageChart(userToken, chart) {
            const chartService = new ChartService();
            this.newChartDetails = await chartService.createAverageChart(userToken, chart);
        },
        async createFoodValueChart(userToken, chart) {
            const chartService = new ChartService();
            this.newChartDetails = await chartService.createFoodValueChart(userToken, chart);
        },
        async createSingleValueComponentWeightByFoodChart(userToken, chart) {
            const chartService = new ChartService();
            this.newChartDetails = await chartService.createSingleValueComponentWeightByFoodChart(userToken, chart);
        },
        async createMultiValueComponentWeightByFoodChart(userToken, chart) {
            const chartService = new ChartService();
            this.newChartDetails = await chartService.createMultiValueComponentWeightByFoodChart(userToken, chart);
        },
        resetNewChartDetails() {
            const chartTitle = "New Chart - " + this.charts.length;
            const chartOptions = new ChartOptions(chartTitle);
            this.newChartDetails = new Chart(this.newChartDetails.id, chartTitle, this.newChartDetails.chartType, null, chartOptions, null, null, "", "");
        },
        async addCharts(userToken) {
            const chartService = new ChartService();
            const newCharts = [this.newChartDetails];
            if (this.newChartDetails.id?.startsWith('chart')) {
                await this.charts.push(this.newChartDetails);
            }
            else {
                this.charts = this.charts.map(chart => {
                    return chart.id === this.newChartDetails.id ? this.newChartDetails : chart;
                });
            }
            await chartService.addCharts(userToken, newCharts);
        },
        async initializeCharts(userToken) {
            const chartService = new ChartService();
            this.charts = [];
            this.charts.push(...await chartService.getAllCharts(userToken));
        }
    },
});
//# sourceMappingURL=chartStore.js.map