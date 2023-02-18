"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartDao = void 0;
const firebase_1 = require("../configs/firebase");
const Chart_1 = require("../models/Chart");
class ChartDao {
    async getAllCharts(authId) {
        try {
            const charts = new Array();
            const documents = await firebase_1.db.collection('users').doc(authId).collection('charts').get();
            documents.forEach(document => {
                console.log(document.data());
                const chart = new Chart_1.Chart(document.id, document.data().chartTitle, document.data().chartType, document.data().chartData, document.data().chartOptions, document.data().selectedComponent, document.data().selectedFood, document.data().startDate, document.data().endDate);
                charts.push(chart);
            });
            return charts;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getChartById(authId, chartId) {
        try {
            const document = await firebase_1.db.collection('users').doc(authId).collection('charts').doc(chartId).get();
            const documentData = document.data();
            const chart = new Chart_1.Chart(document.id, documentData.chartTitle, documentData.chartType, documentData.chartData, documentData.chartOptions, documentData.selectedComponent, documentData.selectedFood, documentData.startDate, documentData.endDate);
            return chart;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addCharts(authId, charts) {
        try {
            const existingCharts = await this.getAllCharts(authId);
            const batch = firebase_1.db.batch();
            for (const chart of charts) {
                const matchingChart = existingCharts.find(existingChart => existingChart.id === chart.id);
                const document = matchingChart ?
                    firebase_1.db.collection('users').doc(authId).collection('charts').doc(matchingChart.id) :
                    firebase_1.db.collection('users').doc(authId).collection('charts').doc();
                let { id, ...newChart } = chart;
                batch.set(document, newChart);
            }
            await batch.commit();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updateChart(authId, chartId, chartData) {
        try {
            await firebase_1.db.collection('users').doc(authId).collection('charts').doc(chartId).update(chartData);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
exports.ChartDao = ChartDao;
