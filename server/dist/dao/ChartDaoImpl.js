"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartDaoImpl = void 0;
const firebase_1 = require("../configs/firebase");
const Chart_1 = require("../models/Chart");
const CustomError_1 = require("../util/error/CustomError");
class ChartDaoImpl {
    async getAllCharts(authId) {
        try {
            const charts = new Array();
            const documents = await firebase_1.db.collection('users').doc(authId).collection('charts').get();
            documents.forEach(document => {
                const chart = new Chart_1.Chart(document.id, document.data().chartTitle, document.data().chartType, document.data().chartData, document.data().chartOptions, document.data().selectedComponent, document.data().selectedFood, document.data().startDate, document.data().endDate);
                charts.push(chart);
            });
            return charts;
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not retrieve charts from database");
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
            throw new CustomError_1.DatabaseError("Could not retrieve chart from database");
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
            throw new CustomError_1.DatabaseError("Could not add chart to database");
        }
    }
    async updateChart(authId, chartId, chartData) {
        try {
            const dataToUpdate = chartData.toObject ? chartData.toObject() : chartData;
            await firebase_1.db.collection('users').doc(authId).collection('charts').doc(chartId).update(dataToUpdate);
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not update chart in database");
        }
    }
    async deleteCharts(authId, chartIds) {
        try {
            const batch = firebase_1.db.batch();
            for (const chartId of chartIds) {
                const document = firebase_1.db.collection('users').doc(authId).collection('charts').doc(chartId);
                batch.delete(document);
            }
            await batch.commit();
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not delete charts from database");
        }
    }
}
exports.ChartDaoImpl = ChartDaoImpl;
