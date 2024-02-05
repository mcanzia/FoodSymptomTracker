import { DateLogDao } from '../dao/DateLogDao';
import { FoodDao } from '../dao/FoodDao';
import { ChartData } from '../models/ChartData';
import { Chart } from '../models/Chart';
import { Component } from '../models/Component';
import { DataSet } from '../models/DataSet';
import { DateLog } from '../models/DateLog';
import { FoodItem } from '../models/FoodItem';
import { format} from 'date-fns';
import { ChartService } from './ChartService';
import { FoodDaoImpl } from '../dao/FoodDaoImpl';
import { DateLogDaoImpl } from '../dao/DateLogDaoImpl';
import ChartType from '../models/ChartType';


export class ChartServiceImpl
{

    async recalculateCharts(authId: any, charts : Array<Chart>) {
        try {
          const chartPromises = charts.map(async chart => {
            switch(chart.chartType) {
              case ChartType.AVERAGE:
                chart.chartData = await this.createAverageChart(authId, chart.selectedComponent, chart.chartMaxFoods);
                return chart;
              case ChartType.FOODVALUE:
                if (!chart.selectedFood) {
                    throw new Error();
                }
                chart.chartData = await this.createFoodValueChart(authId, chart.selectedComponent, chart.selectedFood);
                return chart;
              case ChartType.SVCWEIGHTBYFOOD:
                chart.chartData = await this.createSingleValueComponentWeightByFoodChart(authId, chart.selectedComponent, chart.selectedFood);
                return chart;
              case ChartType.MVCWEIGHTBYFOOD:
                chart.chartData = await this.createMultiValueComponentWeightByFoodChart(authId, chart.selectedComponent, chart.selectedFood);
                return chart;
              default:
                return chart;
            }
          });
          return await Promise.all(chartPromises);
        } catch(error) {
          console.log("Show error");
        }
      }

    async createAverageChart(authId : any, selectedComponent : Component, chartMaxFoods? : number | null, startDate? : string, endDate? : string) {
        const chartData : ChartData = new ChartData();
        chartData.datasets.push(new DataSet([], "Average Value - " + selectedComponent.name));
        const foodDao : FoodDaoImpl = new FoodDaoImpl();
        const dateLogDao : DateLogDaoImpl = new DateLogDaoImpl();
        const foods = await foodDao.getAllFoods(authId);
        const dateLogs = await dateLogDao.getAllDateLogs(authId, startDate, endDate);
        const foodAverageMap : Map<string, number> = new Map();
        foods.map(food => {
            const filteredDateLogs : Array<DateLog> = dateLogs.filter(dateLog => { return dateLog.foodItems.some(foodItem => foodItem.id === food.id);});
            let average : number = 0;
            filteredDateLogs.map(filteredDateLog => {
                const componentValue : number = Number(filteredDateLog.components.find(component => component.id === selectedComponent.id)?.values);
                if (!isNaN(componentValue) && componentValue !== undefined) {
                    average += componentValue;
                }
            });
            if (average === 0) {
                return;
            }
            average = Number((average / filteredDateLogs.length).toFixed(2));
            if (chartMaxFoods && chartMaxFoods > 0) {
                foodAverageMap.set(food.name, average);
            } else {
                chartData.datasets[0].data.push(average);
                chartData.labels.push(food.name);
            }
        });
        if (chartMaxFoods && chartMaxFoods > 0) {
            const sortedMap = new Map([...foodAverageMap.entries()]
                .sort((a, b) => b[1] - a[1])
                .slice(0, chartMaxFoods));
                
            for (const [key, value] of sortedMap.entries()) {
                chartData.datasets[0].data.push(value);
                chartData.labels.push(key);
            }
        }
        return chartData;
    }

    async createFoodValueChart(authId : any, selectedComponent : Component, selectedFood : FoodItem, startDate? : string, endDate? : string) {
        const chartData : ChartData = new ChartData();
        chartData.datasets.push(new DataSet([], selectedComponent.name + " - " + selectedFood.name));
        const dateLogDao : DateLogDaoImpl = new DateLogDaoImpl();
        const dateLogs : Array<DateLog> = await dateLogDao.getDateLogsWithFood(authId, selectedFood, startDate, endDate);
        const dateMonthFoodValueMap : Map<string, Array<number>> = new Map();
        dateLogs.map(dateLog => {
            const month : string = format(new Date(dateLog.date), "MMM");
            const year : string = format(new Date(dateLog.date), "Y");
            const monthYear : string = month + "-" + year;
            const componentWeight : number = Number(dateLog.components.find(component => component.id === selectedComponent.id)?.values);
            if (!dateMonthFoodValueMap.has(monthYear)) {
                dateMonthFoodValueMap.set(monthYear, [componentWeight]);
            } else {
                dateMonthFoodValueMap.get(monthYear)?.push(componentWeight);
            }
        });
        for (const [key, value] of dateMonthFoodValueMap.entries()) {
            let average : number = 0;
            average = value.reduce((prev, curr) => Number(prev) + Number(curr), average);
            average = average !== 0 ? Number((average / value.length).toFixed(2)) : 0;
            chartData.labels.push(key);
            chartData.datasets[0].data.push(average);
        }
        return chartData;
    }

    async createSingleValueComponentWeightByFoodChart(authId : any, selectedComponent : Component, selectedFood? : FoodItem, startDate? : string, endDate? : string) {
        const dateLogDao : DateLogDaoImpl = new DateLogDaoImpl();
        const dateLogs : Array<DateLog> = selectedFood ? 
            await dateLogDao.getDateLogsWithFood(authId, selectedFood, startDate, endDate) : 
            await dateLogDao.getAllDateLogs(authId, startDate, endDate);
        // Map (keys are the select options of the selected component and values are count of how many times that option was chosen within the date range)
        const weightValueMap : Map<string, number> = new Map(selectedComponent.selectOptions.map(selectOption => [selectOption.value, 0]));
        dateLogs.map(dateLog => {
            const componentValue : string = String(dateLog.components.find(component => component.id === selectedComponent.id)?.values);
            if (componentValue !== undefined && componentValue != "") {
                weightValueMap.set(componentValue, Number(weightValueMap.get(componentValue)) + 1);
            }
        });
        const chartLabel = selectedFood ? selectedComponent.name + " - " + selectedFood.name : selectedComponent.name;
        return this.setChartData(weightValueMap, chartLabel);
    }

    async createMultiValueComponentWeightByFoodChart(authId : any, selectedComponent : Component, selectedFood? : FoodItem, startDate? : string, endDate? : string) {
        const dateLogDao : DateLogDaoImpl = new DateLogDaoImpl();
        const dateLogs : Array<DateLog> = selectedFood ? 
            await dateLogDao.getDateLogsWithFood(authId, selectedFood, startDate, endDate) : 
            await dateLogDao.getAllDateLogs(authId, startDate, endDate);
        const weightValueMap : Map<string, number> = new Map(selectedComponent.selectOptions.map(selectOption => [selectOption.value, 0]));
        dateLogs.map(dateLog => {
            const componentValues : Array<string> = dateLog.components.find(component => component.id === selectedComponent.id)?.values ?? new Array();
            console.log(componentValues);
            componentValues.map(componentValue => {
                if (componentValue !== undefined && componentValue != "") {
                    weightValueMap.set(componentValue, Number(weightValueMap.get(componentValue)) + 1);
                }
            });
        });
        const chartLabel = selectedFood ? selectedComponent.name + " - " + selectedFood.name : selectedComponent.name;
        return this.setChartData(weightValueMap, chartLabel);
    }

    private setChartData(weightValueMap : Map<string, number>, chartLabel : string) {
        const chartData : ChartData = new ChartData();
        chartData.datasets.push(new DataSet([], chartLabel));
        for (const [key, value] of weightValueMap.entries()) {
            chartData.labels.push(key);
            chartData.datasets[0].data.push(value);
        }
        return chartData;
    }
    
}

