"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const firebase_1 = require("../../configs/firebase");
const ChartDaoImpl_1 = require("../../dao/ChartDaoImpl");
const MockCharts_1 = require("../mockData/MockCharts");
const CustomError_1 = require("../../util/error/CustomError");
(0, vitest_1.describe)('chart dao method tests', () => {
    let chartDao;
    let authId = "ABC123";
    let mockChartData = [];
    (0, vitest_1.beforeEach)(async () => {
        chartDao = new ChartDaoImpl_1.ChartDaoImpl();
        mockChartData = MockCharts_1.MockCharts.createChartArray();
        await Promise.all(mockChartData.map((chart) => {
            return firebase_1.db.collection('users').doc(authId).collection('charts').doc(chart.id).set(chart);
        }));
    });
    (0, vitest_1.describe)('getAllCharts', () => {
        (0, vitest_1.it)('gets all charts successfully', async () => {
            const charts = await chartDao.getAllCharts(authId);
            (0, vitest_1.expect)(charts.length).toBe(2);
            (0, vitest_1.expect)(charts).toContainEqual(mockChartData[0]);
            (0, vitest_1.expect)(charts).toContainEqual(mockChartData[1]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving Charts"); });
            await (0, vitest_1.expect)(chartDao.getAllCharts(authId)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('getChartById', () => {
        (0, vitest_1.it)('gets chart by id successfully', async () => {
            const chart = await chartDao.getChartById(authId, mockChartData[0].id);
            (0, vitest_1.expect)(chart).toEqual(mockChartData[0]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving Charts"); });
            await (0, vitest_1.expect)(chartDao.getChartById(authId, mockChartData[0].id)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('addCharts', () => {
        const newChartData = MockCharts_1.MockCharts.createChartArrayTwo();
        (0, vitest_1.it)('adds new charts successfully', async () => {
            await chartDao.addCharts(authId, newChartData);
            const charts = await chartDao.getAllCharts(authId);
            (0, vitest_1.expect)(charts.length).toBe(4);
        });
        (0, vitest_1.it)('updates existing charts successfully', async () => {
            await chartDao.addCharts(authId, mockChartData);
            const charts = await chartDao.getAllCharts(authId);
            (0, vitest_1.expect)(charts.length).toBe(2);
            (0, vitest_1.expect)(charts).toContainEqual(mockChartData[0]);
            (0, vitest_1.expect)(charts).toContainEqual(mockChartData[1]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Adding Charts"); });
            await (0, vitest_1.expect)(chartDao.addCharts(authId, newChartData)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('updateCharts', () => {
        (0, vitest_1.it)('updates chart by id successfully', async () => {
            await chartDao.updateChart(authId, mockChartData[0].id, mockChartData[0]);
            const charts = await chartDao.getAllCharts(authId);
            (0, vitest_1.expect)(charts.length).toBe(2);
            (0, vitest_1.expect)(charts).toContainEqual(mockChartData[0]);
            (0, vitest_1.expect)(charts).toContainEqual(mockChartData[1]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Updating Chart"); });
            await (0, vitest_1.expect)(chartDao.updateChart(authId, mockChartData[0].id, mockChartData[0])).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('deleteCharts', () => {
        (0, vitest_1.it)('deletes charts successfully', async () => {
            const mockChartDataIds = mockChartData.map(mockChart => mockChart.id);
            let charts = await chartDao.getAllCharts(authId);
            (0, vitest_1.expect)(charts.length).toBe(2);
            (0, vitest_1.expect)(charts).toContainEqual(mockChartData[0]);
            (0, vitest_1.expect)(charts).toContainEqual(mockChartData[1]);
            await chartDao.deleteCharts(authId, mockChartDataIds);
            charts = await chartDao.getAllCharts(authId);
            (0, vitest_1.expect)(charts.length).toBe(0);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const mockChartDataIds = mockChartData.map(mockChart => mockChart.id);
            const dbMock = vitest_1.vi.spyOn(firebase_1.db, "batch");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Deleting Charts"); });
            await (0, vitest_1.expect)(chartDao.deleteCharts(authId, mockChartDataIds)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.afterEach)(async () => {
        vitest_1.vi.clearAllMocks();
        const chartsRef = firebase_1.db.collection('users').doc(authId).collection('charts');
        const snapshot = await chartsRef.get();
        const batch = firebase_1.db.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        await firebase_1.db.collection('users').doc(authId).delete();
    });
});
