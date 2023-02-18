import { defineStore } from 'pinia'
import { ChartService } from '../services/ChartService';
import { Chart } from '../models/Chart';
import { ChartTitle } from '@/models/ChartTitle';
import { ChartPlugins } from '@/models/ChartPlugins';
import { ChartOptions } from '@/models/ChartOptions';

interface IChartState {
  charts : Array<Chart>
  newChartDetails : Chart
  chartPanelOpen : boolean
}

export const useChartStore = defineStore('chartStore', {
    state: () : IChartState => ({
        charts : [],
        newChartDetails : new Chart(null, "", "", null, null, null, null, "", ""),
        chartPanelOpen: false
      }),
    actions: {
        async createAverageChart(userToken : any, chart : Chart) {
          const chartService = new ChartService();
          this.newChartDetails = await chartService.createAverageChart(userToken, chart);
        },
        async createFoodValueChart(userToken : any, chart : Chart) {
          const chartService = new ChartService();
          this.newChartDetails = await chartService.createFoodValueChart(userToken, chart);
        },
        async createSingleValueComponentWeightByFoodChart(userToken : any, chart : Chart) {
          const chartService = new ChartService();
          this.newChartDetails = await chartService.createSingleValueComponentWeightByFoodChart(userToken, chart);
        },
        async createMultiValueComponentWeightByFoodChart(userToken : any, chart : Chart) {
          const chartService = new ChartService();
          this.newChartDetails = await chartService.createMultiValueComponentWeightByFoodChart(userToken, chart);
        },
        resetNewChartDetails() {
          const chartTitle = "New Chart - " + this.charts.length;
          const chartOptions = new ChartOptions(chartTitle);
          this.newChartDetails = new Chart(this.newChartDetails.id, chartTitle, this.newChartDetails.chartType, null, chartOptions, null, null, "", "");
        },
        async addCharts(userToken : any) {
          const chartService = new ChartService();
          const newCharts : Array<Chart> = [this.newChartDetails];
          await chartService.addCharts(userToken, newCharts);
        },
        async initializeCharts(userToken : any) {
          const chartService = new ChartService();
          this.charts = await chartService.getAllCharts(userToken);
        }
      },
    });