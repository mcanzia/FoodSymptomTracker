"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const firebase_1 = require("../../configs/firebase");
const DateLogDaoImpl_1 = require("../../dao/DateLogDaoImpl");
const MockDateLogs_1 = require("../mockData/MockDateLogs");
const CustomError_1 = require("../../util/error/CustomError");
(0, vitest_1.describe)('dateLog dao method tests', () => {
    firebase_1.testdb.useEmulator("localhost", 8080);
    let dateLogDao;
    let authId = "ABC123";
    let mockDateLogData = [];
    (0, vitest_1.beforeEach)(async () => {
        dateLogDao = new DateLogDaoImpl_1.DateLogDaoImpl();
        mockDateLogData = MockDateLogs_1.MockDateLogs.createDateLogArray();
        mockDateLogData.forEach(async (dateLog, index) => {
            await firebase_1.testdb.collection('users').doc(authId).collection('dateLogs').doc(dateLog.id).set(dateLog);
        });
    });
    (0, vitest_1.describe)('getAllDateLogs', () => {
        (0, vitest_1.it)('gets all dateLogs successfully', async () => {
            const dateLogs = await dateLogDao.getAllDateLogs(authId);
            (0, vitest_1.expect)(dateLogs.length).toBe(2);
            (0, vitest_1.expect)(dateLogs).toContainEqual(mockDateLogData[0]);
            (0, vitest_1.expect)(dateLogs).toContainEqual(mockDateLogData[1]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.testdb, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving DateLogs"); });
            await (0, vitest_1.expect)(dateLogDao.getAllDateLogs(authId)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('getDateLogById', () => {
        (0, vitest_1.it)('gets dateLog by id successfully', async () => {
            const dateLog = await dateLogDao.getDateLogById(authId, mockDateLogData[0].id);
            (0, vitest_1.expect)(dateLog).toEqual(mockDateLogData[0]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.testdb, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Retrieving DateLogs"); });
            await (0, vitest_1.expect)(dateLogDao.getDateLogById(authId, mockDateLogData[0].id)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('addDateLogs', () => {
        const newDateLogData = MockDateLogs_1.MockDateLogs.createDateLogArrayTwo();
        (0, vitest_1.it)('adds new dateLogs successfully', async () => {
            await dateLogDao.addDateLogs(authId, newDateLogData);
            const dateLogs = await dateLogDao.getAllDateLogs(authId);
            (0, vitest_1.expect)(dateLogs.length).toBe(4);
        });
        (0, vitest_1.it)('updates existing dateLogs successfully', async () => {
            await dateLogDao.addDateLogs(authId, mockDateLogData);
            const dateLogs = await dateLogDao.getAllDateLogs(authId);
            (0, vitest_1.expect)(dateLogs.length).toBe(2);
            (0, vitest_1.expect)(dateLogs).toContainEqual(mockDateLogData[0]);
            (0, vitest_1.expect)(dateLogs).toContainEqual(mockDateLogData[1]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.testdb, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Adding DateLogs"); });
            await (0, vitest_1.expect)(dateLogDao.addDateLogs(authId, newDateLogData)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('updateDateLogs', () => {
        (0, vitest_1.it)('updates dateLog by id successfully', async () => {
            await dateLogDao.updateDateLogs(authId, mockDateLogData[0].id, mockDateLogData[0]);
            const dateLogs = await dateLogDao.getAllDateLogs(authId);
            (0, vitest_1.expect)(dateLogs.length).toBe(2);
            (0, vitest_1.expect)(dateLogs).toContainEqual(mockDateLogData[0]);
            (0, vitest_1.expect)(dateLogs).toContainEqual(mockDateLogData[1]);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const dbMock = vitest_1.vi.spyOn(firebase_1.testdb, "collection");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Updating DateLog"); });
            await (0, vitest_1.expect)(dateLogDao.updateDateLogs(authId, mockDateLogData[0].id, mockDateLogData[0])).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.describe)('deleteDateLogs', () => {
        (0, vitest_1.it)('deletes dateLogs successfully', async () => {
            const mockDateLogDataIds = mockDateLogData.map(dateLog => dateLog.id);
            let dateLogs = await dateLogDao.getAllDateLogs(authId);
            (0, vitest_1.expect)(dateLogs.length).toBe(2);
            (0, vitest_1.expect)(dateLogs).toContainEqual(mockDateLogData[0]);
            (0, vitest_1.expect)(dateLogs).toContainEqual(mockDateLogData[1]);
            await dateLogDao.deleteDateLogs(authId, mockDateLogDataIds);
            dateLogs = await dateLogDao.getAllDateLogs(authId);
            (0, vitest_1.expect)(dateLogs.length).toBe(0);
        });
        (0, vitest_1.it)('handles errors gracefully', async () => {
            const mockDateLogDataIds = mockDateLogData.map(dateLog => dateLog.id);
            const dbMock = vitest_1.vi.spyOn(firebase_1.testdb, "batch");
            dbMock.mockImplementationOnce(() => { throw new Error("Error Deleting DateLogs"); });
            await (0, vitest_1.expect)(dateLogDao.deleteDateLogs(authId, mockDateLogDataIds)).rejects.toThrow(CustomError_1.DatabaseError);
        });
    });
    (0, vitest_1.afterEach)(async () => {
        vitest_1.vi.clearAllMocks();
        const dateLogsRef = firebase_1.testdb.collection('users').doc(authId).collection('dateLogs');
        const snapshot = await dateLogsRef.get();
        const batch = firebase_1.testdb.batch();
        snapshot.docs.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
        await firebase_1.testdb.collection('users').doc(authId).delete();
    });
});
