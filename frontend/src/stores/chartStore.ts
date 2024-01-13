import { defineStore } from 'pinia'
import { ChartService } from '../services/ChartService';
import { Chart } from '../models/Chart';
import { ChartOptions } from '../models/ChartOptions';
import { ChartShapeParams } from '../models/ChartShapeParams';
import ChartShape from '../models/ChartShape';

interface IChartState {
  charts : Array<Chart>
  dateRange : Array<Date>
  newChartDetails : Chart,
  chartShapeParams : Array<ChartShapeParams>
}

export const useChartStore = defineStore('chartStore', {
    state: () : IChartState => ({
        charts : [],
        dateRange: [],
        newChartDetails : new Chart(null, "", "", null, null, null, null, "", ""),
        chartShapeParams: []
      }),
    actions: {
        async createAverageChart(chart : Chart) {
          try {
            const chartService = new ChartService();
            this.newChartDetails = await chartService.createAverageChart(chart);
          } catch (error) {
            console.log("Show error");
          }
        },
        async createFoodValueChart(chart : Chart) {
          try {
            const chartService = new ChartService();
            this.newChartDetails = await chartService.createFoodValueChart(chart);
          } catch (error) {
            console.log("Show error");
          }
        },
        async createSingleValueComponentWeightByFoodChart(chart : Chart) {
          try {
            const chartService = new ChartService();
            this.newChartDetails = await chartService.createSingleValueComponentWeightByFoodChart(chart);
          } catch (error) {
            console.log("Show error");
          }
        },
        async createMultiValueComponentWeightByFoodChart(chart : Chart) {
          try {
            const chartService = new ChartService();
            this.newChartDetails = await chartService.createMultiValueComponentWeightByFoodChart(chart);
          } catch (error) {
            console.log("Show error");
          }
        },
        resetNewChartDetails() {
          const chartTitle = "New Chart - " + this.charts.length;
          const chartOptions = new ChartOptions(chartTitle);
          this.newChartDetails = new Chart(this.newChartDetails.id, chartTitle, this.newChartDetails.chartType, null, chartOptions, null, null, "", "");
        },
        async addCharts() {
          try {
            const chartService = new ChartService();
            const newCharts : Array<Chart> = [this.newChartDetails];
            await chartService.addCharts(newCharts);
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
        async deleteCharts(chartsToDelete : Array<Chart>) {
          try {
            const chartService = new ChartService();
            const chartIds = chartsToDelete.map(chartToDelete => chartToDelete.id);
            await chartService.deleteCharts(chartsToDelete);
            this.charts = await this.charts.filter(chart => !chartIds.includes(chart.id));
          } catch (error) {
            console.log("Show error");
          }
        },
        async initializeCharts() {
          try {
            const chartService = new ChartService();
            this.charts = [];
            this.charts.push(...await chartService.getAllCharts());
          } catch (error) {
            console.log("Show error");
          }
        },
        initializeChartShapeParams() {
          this.chartShapeParams = [];
          this.chartShapeParams.push(new ChartShapeParams(ChartShape.BAR, true, '250px', '400px'));
          this.chartShapeParams.push(new ChartShapeParams(ChartShape.LINE, true, '250px', '400px'));
          this.chartShapeParams.push(new ChartShapeParams(ChartShape.PIE, true, '350px', '300px'));
          this.chartShapeParams.push(new ChartShapeParams(ChartShape.DOUGHNUT, true, '350px', '300px'));
          this.chartShapeParams.push(new ChartShapeParams(ChartShape.RADAR, true, '350px', '300px'));
        }
      },
    });