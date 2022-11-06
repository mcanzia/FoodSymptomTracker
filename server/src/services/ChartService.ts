import { ChartDao } from '../dao/ChartDao';
import { DateLogDao } from '../dao/DateLogDao';
import { FoodDao } from '../dao/FoodDao';
import { Chart } from '../models/Chart';
import { ChartData } from '../models/ChartData';
import { Component } from '../models/Component';
import { DataSet } from '../models/DataSet';
import { DateLog } from '../models/DateLog';
import { FoodItem } from '../models/FoodItem';
import { format} from 'date-fns';


export class ChartService
{
    private chartDao : ChartDao;

    constructor() {
        this.chartDao = new ChartDao();
    }

    async createAverageChart(authId : any, startDate : Date, endDate : Date, selectedComponent : Component) {
        console.log('Average chart');
        const foodDao : FoodDao = new FoodDao();
        const dateLogDao : DateLogDao = new DateLogDao();
        const foods = await foodDao.getAllFoods(authId);
        const dateLogs = await dateLogDao.getAllDateLogs(authId);
        const chartData : ChartData = new ChartData(startDate, endDate);
        foods.map(food => {
            const filteredDateLogs : Array<DateLog> = dateLogs.filter(dateLog => { return dateLog.foodItems.includes(food) });
            let average : number = 0;
            filteredDateLogs.map(filteredDateLog => {
                const componentValue : number = Number(filteredDateLog.components.find(component => component.id === selectedComponent.id)?.values);
                if (!isNaN(componentValue) && componentValue !== undefined) {
                    average += componentValue;
                }
            });
            average = Number((average / filteredDateLogs.length).toFixed(2));
            
            let chartDataSet = new DataSet(new Array(average), food.name);
            chartData.datasets.push(chartDataSet);
        });
        return chartData;
    }

    async createFoodValueChart(authId : any, startDate : Date, endDate : Date, selectedComponent : Component, selectedFood : FoodItem) {
        console.log('Food Value chart');
        const dateLogDao : DateLogDao = new DateLogDao();
        const dateLogs : Array<DateLog> = await dateLogDao.getDateLogsWithFood(authId, selectedFood);
        const dateMonthFoodValueMap = new Map();
        const chartData : ChartData = new ChartData(startDate, endDate);
        dateLogs.map(dateLog => {
            const dateMonth : string = format(new Date(dateLog.date), "MMM");
            const dateYear : string = format(new Date(dateLog.date), "Y");
            const monthYear : string = dateMonth + "-" + dateYear;
            const componentWeight : number = Number(dateLog.components.find(component => component.id === selectedComponent.id)?.values);
        });
        console.log(dateLogs);
    }

    async createComponentWeightByFoodChart(authId : any) {
        console.log('Component weight by food chart');
    }

    async createComponentWeightByAllFoodChart(authId : any) {
        console.log('component weight by all food chart');
    }
    
}

