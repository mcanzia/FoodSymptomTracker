import { defineStore } from 'pinia'
import { ChartService } from '../services/ChartService';

export const useChartStore = defineStore('chartStore', {
    state: () => ({
        charts: [],
        displayCharts: [],
        newChartDetails: {
          id: null,
          chartTitle : "",
          chartType : "",
          chartData : null,
          selectedComponent : null,
          selectedFood : null,
          startDate : "",
          endDate : ""
        },
        chartPanelOpen: false
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
          this.newChartDetails = {
            id: this.newChartDetails.id,
            chartTitle : "New Chart - " + this.charts.length,
            chartType : this.newChartDetails.chartType,
            chartData : null,
            selectedComponent : null,
            selectedFood : null,
            startDate : "",
            endDate : ""
          }
        },
        async addCharts(userToken) {
          const chartService = new ChartService();
          const newCharts = [this.newChartDetails];
          await chartService.addCharts(userToken, newCharts);
        },
        async initializeCharts(userToken) {
          const chartService = new ChartService();
          this.charts = await chartService.getAllCharts(userToken);
          this.updateDisplayCharts();
        },
        updateDisplayCharts() {
          try {
              this.displayCharts = this.charts.map(chart => {
                  let chartOptions = {
                      plugins: {
                          title: {
                              display: true,
                              text: chart.chartTitle
                          }
                      }
                  };
                  let chartDisplay =
                  {
                      id: chart.id,
                      chartType: chart.chartType,
                      chartData: chart.chartData,
                      chartOptions: chartOptions,
                  }
                  return chartDisplay;
              });    
          } catch (error) {
              console.log(error)
          }
      },
    }
})