import { expect, beforeEach, afterEach, describe, it, vi } from 'vitest'
import { db } from '../../configs/firebase';
import { ChartDaoImpl } from '../../dao/ChartDaoImpl';
import { Chart } from '../../models/Chart';
import { MockCharts } from '../mockData/MockCharts';
import { DatabaseError } from '../../util/error/CustomError';

describe('chart dao method tests', () => {
  let chartDao: ChartDaoImpl;
  let authId = "ABC123";
  let mockChartData : Array<Chart> = [];

  beforeEach(async () => {
    chartDao = new ChartDaoImpl();
    mockChartData = MockCharts.createChartArray();
    await Promise.all(mockChartData.map((chart) => {
        return db.collection('users').doc(authId).collection('charts').doc(chart.id).set(chart);
    }));
  });


  describe('getAllCharts', () => {
    it('gets all charts successfully', async () => {    
        const charts : Array<Chart> = await chartDao.getAllCharts(authId);
        expect(charts.length).toBe(2);
        expect(charts).toContainEqual(mockChartData[0]);
        expect(charts).toContainEqual(mockChartData[1]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving Charts") });
        await expect(chartDao.getAllCharts(authId)).rejects.toThrow(DatabaseError);
    })
  });

  describe('getChartById', () => {
    it('gets chart by id successfully', async () => {    
        const chart : Chart = await chartDao.getChartById(authId, mockChartData[0].id);
        expect(chart).toEqual(mockChartData[0]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving Charts") });
        await expect(chartDao.getChartById(authId, mockChartData[0].id)).rejects.toThrow(DatabaseError);
    })
  });

  describe('addCharts', () => {
    const newChartData : Array<Chart> = MockCharts.createChartArrayTwo();
    it('adds new charts successfully', async () => {    
        await chartDao.addCharts(authId, newChartData);
        const charts : Array<Chart> = await chartDao.getAllCharts(authId);
        expect(charts.length).toBe(4);
    })
    it('updates existing charts successfully', async () => {    
        await chartDao.addCharts(authId, mockChartData);
        const charts : Array<Chart> = await chartDao.getAllCharts(authId);
        expect(charts.length).toBe(2);
        expect(charts).toContainEqual(mockChartData[0]);
        expect(charts).toContainEqual(mockChartData[1]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Adding Charts") });
        await expect(chartDao.addCharts(authId, newChartData)).rejects.toThrow(DatabaseError);
    })
  });

  describe('updateCharts', () => {
    it('updates chart by id successfully', async () => {    
        await chartDao.updateChart(authId, mockChartData[0].id, mockChartData[0]);
        const charts : Array<Chart> = await chartDao.getAllCharts(authId);
        expect(charts.length).toBe(2);
        expect(charts).toContainEqual(mockChartData[0]);
        expect(charts).toContainEqual(mockChartData[1]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Updating Chart") });
        await expect(chartDao.updateChart(authId, mockChartData[0].id, mockChartData[0])).rejects.toThrow(DatabaseError);
    })
  });

  describe('deleteCharts', () => {
    it('deletes charts successfully', async () => {   
        const mockChartDataIds : Array<string> = mockChartData.map(mockChart => mockChart.id);
        let charts : Array<Chart> = await chartDao.getAllCharts(authId); 
        expect(charts.length).toBe(2);
        expect(charts).toContainEqual(mockChartData[0]);
        expect(charts).toContainEqual(mockChartData[1]);
        await chartDao.deleteCharts(authId,mockChartDataIds);
        charts = await chartDao.getAllCharts(authId);
        expect(charts.length).toBe(0);
    })
    it('handles errors gracefully', async() => {
        const mockChartDataIds : Array<string> = mockChartData.map(mockChart => mockChart.id);
        const dbMock = vi.spyOn(db, "batch");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Deleting Charts") });
        await expect(chartDao.deleteCharts(authId, mockChartDataIds)).rejects.toThrow(DatabaseError);
    })
  });

  afterEach(async () => {
    vi.clearAllMocks();
    const chartsRef = db.collection('users').doc(authId).collection('charts');
    const snapshot = await chartsRef.get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    await batch.commit();
    await db.collection('users').doc(authId).delete();
  });
})
