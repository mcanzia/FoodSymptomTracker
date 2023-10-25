import { expect, beforeEach, afterEach, describe, it, vi } from 'vitest'
import { db } from '../../configs/firebase';
import { DateLogDaoImpl } from '../../dao/DateLogDaoImpl';
import { DateLog } from '../../models/DateLog';
import { MockDateLogs } from '../mockData/MockDateLogs';
import { DatabaseError } from '../../util/error/CustomError';

describe('dateLog dao method tests', () => {
  let dateLogDao: DateLogDaoImpl;
  let authId = "ABC123";
  let mockDateLogData : Array<DateLog> = [];

  beforeEach(async () => {
    dateLogDao = new DateLogDaoImpl();
    mockDateLogData = MockDateLogs.createDateLogArray();
    await Promise.all(mockDateLogData.map((dateLog) => {
      return db.collection('users').doc(authId).collection('dateLogs').doc(dateLog.id).set(dateLog);
    }));
  });
  

  describe('getAllDateLogs', () => {
    it('gets all dateLogs successfully', async () => {    
        const dateLogs : Array<DateLog> = await dateLogDao.getAllDateLogs(authId);
        expect(dateLogs.length).toBe(2);
        expect(dateLogs).toContainEqual(mockDateLogData[0]);
        expect(dateLogs).toContainEqual(mockDateLogData[1]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving DateLogs") });
        await expect(dateLogDao.getAllDateLogs(authId)).rejects.toThrow(DatabaseError);
    })
  });

  describe('getDateLogById', () => {
    it('gets dateLog by id successfully', async () => {    
        const dateLog : DateLog = await dateLogDao.getDateLogById(authId, mockDateLogData[0].id);
        expect(dateLog).toEqual(mockDateLogData[0]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving DateLogs") });
        await expect(dateLogDao.getDateLogById(authId, mockDateLogData[0].id)).rejects.toThrow(DatabaseError);
    })
  });

  describe('addDateLogs', () => {
    const newDateLogData : Array<DateLog> = MockDateLogs.createDateLogArrayTwo();
    it('adds new dateLogs successfully', async () => {    
        await dateLogDao.addDateLogs(authId, newDateLogData);
        const dateLogs : Array<DateLog> = await dateLogDao.getAllDateLogs(authId);
        expect(dateLogs.length).toBe(4);
    })
    it('updates existing dateLogs successfully', async () => {    
        await dateLogDao.addDateLogs(authId, mockDateLogData);
        const dateLogs : Array<DateLog> = await dateLogDao.getAllDateLogs(authId);
        expect(dateLogs.length).toBe(2);
        expect(dateLogs).toContainEqual(mockDateLogData[0]);
        expect(dateLogs).toContainEqual(mockDateLogData[1]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Adding DateLogs") });
        await expect(dateLogDao.addDateLogs(authId, newDateLogData)).rejects.toThrow(DatabaseError);
    })
  });

  describe('updateDateLogs', () => {
    it('updates dateLog by id successfully', async () => {    
        await dateLogDao.updateDateLogs(authId, mockDateLogData[0].id, mockDateLogData[0]);
        const dateLogs : Array<DateLog> = await dateLogDao.getAllDateLogs(authId);
        expect(dateLogs.length).toBe(2);
        expect(dateLogs).toContainEqual(mockDateLogData[0]);
        expect(dateLogs).toContainEqual(mockDateLogData[1]);
    })
    it('handles errors gracefully', async() => {
        const dbMock = vi.spyOn(db, "collection");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Updating DateLog") });
        await expect(dateLogDao.updateDateLogs(authId, mockDateLogData[0].id, mockDateLogData[0])).rejects.toThrow(DatabaseError);
    })
  });

  describe('deleteDateLogs', () => {
    it('deletes dateLogs successfully', async () => {   
        const mockDateLogDataIds : Array<string> = mockDateLogData.map(dateLog => dateLog.id);
        let dateLogs : Array<DateLog> = await dateLogDao.getAllDateLogs(authId); 
        expect(dateLogs.length).toBe(2);
        expect(dateLogs).toContainEqual(mockDateLogData[0]);
        expect(dateLogs).toContainEqual(mockDateLogData[1]);
        await dateLogDao.deleteDateLogs(authId, mockDateLogDataIds);
        dateLogs = await dateLogDao.getAllDateLogs(authId);
        expect(dateLogs.length).toBe(0);
    })
    it('handles errors gracefully', async() => {
        const mockDateLogDataIds : Array<string> = mockDateLogData.map(dateLog => dateLog.id);
        const dbMock = vi.spyOn(db, "batch");
        dbMock.mockImplementationOnce(() => { throw new Error("Error Deleting DateLogs") });
        await expect(dateLogDao.deleteDateLogs(authId, mockDateLogDataIds)).rejects.toThrow(DatabaseError);
    })
  });

  afterEach(async () => {
    vi.clearAllMocks();
    const dateLogsRef = db.collection('users').doc(authId).collection('dateLogs');
    const snapshot = await dateLogsRef.get();
    const batch = db.batch();
    snapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
    });
    await batch.commit();
    await db.collection('users').doc(authId).delete();
  });
})
