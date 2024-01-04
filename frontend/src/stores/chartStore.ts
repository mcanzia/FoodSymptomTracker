import { defineStore } from 'pinia'
import { ChartService } from '../services/ChartService';
import { Chart } from '../models/Chart';
import { ChartTitle } from '../models/ChartTitle';
import { ChartPlugins } from '../models/ChartPlugins';
import { ChartOptions } from '../models/ChartOptions';
import { useErrorStore } from './errorStore';

interface IChartState {
  charts : Array<Chart>
  dateRange : Array<Date>
  newChartDetails : Chart
}

export const useChartStore = defineStore('chartStore', {
    state: () : IChartState => ({
        charts : [],
        dateRange: [],
        newChartDetails : new Chart(null, "", "", null, null, null, null, "", "")
      }),
    actions: {
        async createAverageChart(userToken : any, chart : Chart) {
          try {
            const chartService = new ChartService();
            this.newChartDetails = await chartService.createAverageChart(userToken, chart);
          } catch (error) {
            console.log("Show error");
          }
        },
        async createFoodValueChart(userToken : any, chart : Chart) {
          try {
            const chartService = new ChartService();
            this.newChartDetails = await chartService.createFoodValueChart(userToken, chart);
          } catch (error) {
            console.log("Show error");
          }
        },
        async createSingleValueComponentWeightByFoodChart(userToken : any, chart : Chart) {
          try {
            const chartService = new ChartService();
            this.newChartDetails = await chartService.createSingleValueComponentWeightByFoodChart(userToken, chart);
          } catch (error) {
            console.log("Show error");
          }
        },
        async createMultiValueComponentWeightByFoodChart(userToken : any, chart : Chart) {
          try {
            const chartService = new ChartService();
            this.newChartDetails = await chartService.createMultiValueComponentWeightByFoodChart(userToken, chart);
          } catch (error) {
            console.log("Show error");
          }
        },
        resetNewChartDetails() {
          const chartTitle = "New Chart - " + this.charts.length;
          const chartOptions = new ChartOptions(chartTitle);
          this.newChartDetails = new Chart(this.newChartDetails.id, chartTitle, this.newChartDetails.chartType, null, chartOptions, null, null, "", "");
        },
        async addCharts(userToken : any) {
          try {
            const chartService = new ChartService();
            const newCharts : Array<Chart> = [this.newChartDetails];
            await chartService.addCharts(userToken, newCharts);
            if (this.newChartDetails.id?.startsWith('chart')) {
              await this.charts.push(this.newChartDetails);
            } else {
              this.charts = this.charts.map(chart => {
                return chart.id === this.newChartDetails.id ? this.newChartDetails : chart; 
              });
            }
          } catch (error) {
            console.log("Show error");
          }
          
        },
        async deleteCharts(userToken : any, chartsToDelete : Array<Chart>) {
          try {
            const chartService = new ChartService();
            const chartIds = chartsToDelete.map(chartToDelete => chartToDelete.id);
            await chartService.deleteCharts(userToken, chartsToDelete);
            this.charts = await this.charts.filter(chart => !chartIds.includes(chart.id));
          } catch (error) {
            console.log("Show error");
          }
        },
        async initializeCharts(userToken : any) {
          try {
            const chartService = new ChartService();
            this.charts = [];
            this.charts.push(...await chartService.getAllCharts(userToken));
          } catch (error) {
            console.log("Show error");
          }
        }
      },
    });