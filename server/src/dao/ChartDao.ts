import { db } from '../configs/firebase';
import { Chart } from '../models/Chart';

export class ChartDao {
    
    async getAllCharts(authId : any) {   
        try {     
            const charts : Array<Chart> =  new Array<Chart>();    
            const documents = await db.collection('users').doc(authId).collection('charts').get();
            documents.forEach(document => {
                console.log(document.data());
                const chart : Chart = new Chart(document.id, document.data().chartTitle, document.data().chartType, document.data().chartData);
                charts.push(chart);
            });
            return charts;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getChartById(authId : any, chartId : string) {    
        try {    
            const document = await db.collection('users').doc(authId).collection('charts').doc(chartId).get();
            const documentData : any = document.data();
            const chart : Chart = new Chart(document.id, documentData.chartTitle, documentData.chartType, documentData.chartData);
            return chart;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addCharts(authId : any, charts : Array<Chart>) {
        try {
            const existingCharts : Array<Chart> = await this.getAllCharts(authId);
            const batch = db.batch();
            for (const chart of charts) {
                if (!chart.id) {
                    const matchingChart = existingCharts.find(existingChart => existingChart.chartTitle === chart.chartTitle);
                    if (matchingChart) {
                        console.log('already exists');
                        continue;
                    }
                    const document = db.collection('users').doc(authId).collection('charts').doc();
                    let {id, ...newChart } = chart;
                    console.log('new chart');
                    batch.set(document, newChart);
                }
            }
            await batch.commit();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateChart(authId : any, chartId : string, chartData : Chart) {
        try {
            await db.collection('users').doc(authId).collection('charts').doc(chartId).update(chartData);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
}

