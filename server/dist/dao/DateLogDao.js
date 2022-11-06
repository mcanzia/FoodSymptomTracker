"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateLogDao = void 0;
const firebase_1 = require("../configs/firebase");
const DateLog_1 = require("../models/DateLog");
class DateLogDao {
    async getAllDateLogs(authId, startDate, endDate) {
        try {
            const dateLogs = new Array();
            const documents = await firebase_1.db.collection('users').doc(authId).collection('dateLogs').orderBy('date').get();
            documents.forEach(document => {
                const dateLog = new DateLog_1.DateLog(document.id, document.data().date, document.data().foodItems, document.data().components);
                dateLogs.push(dateLog);
            });
            return dateLogs;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getDateLogsWithFood(authId, food, startDate, endDate) {
        try {
            const dateLogs = new Array();
            const documents = await firebase_1.db.collection('users').doc(authId).collection('dateLogs').where('foodItems', 'array-contains', { id: food.id, name: food.name }).orderBy('date').get();
            documents.forEach(document => {
                const dateLog = new DateLog_1.DateLog(document.id, document.data().date, document.data().foodItems, document.data().components);
                dateLogs.push(dateLog);
            });
            return dateLogs;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async getDateLogById(authId, dateLogId) {
        try {
            const document = await firebase_1.db.collection('users').doc(authId).collection('dateLogs').doc(dateLogId).get();
            const documentData = document.data();
            const dateLog = new DateLog_1.DateLog(document.id, documentData.date, documentData.foodItems, documentData.components);
            return dateLog;
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async addDateLogs(authId, dateLogs) {
        try {
            const existingDateLogs = await this.getAllDateLogs(authId);
            const batch = firebase_1.db.batch();
            for (const dateLog of dateLogs) {
                if (!dateLog.id) {
                    const matchingDateLog = existingDateLogs.find(existingDateLog => existingDateLog.date === dateLog.date);
                    if (matchingDateLog) {
                        console.log('already exists');
                        continue;
                    }
                    const document = firebase_1.db.collection('users').doc(authId).collection('dateLogs').doc();
                    let { id, ...newDateLog } = dateLog;
                    console.log('new dateLog');
                    batch.set(document, newDateLog);
                }
            }
            await batch.commit();
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async updateDateLogs(authId, dateLogId, dateLogData) {
        try {
            await firebase_1.db.collection('users').doc(authId).collection('dateLogs').doc(dateLogId).update(dateLogData);
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
}
exports.DateLogDao = DateLogDao;
