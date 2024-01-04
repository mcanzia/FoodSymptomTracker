"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateLogDaoImpl = void 0;
const firebase_1 = require("../configs/firebase");
const DateLog_1 = require("../models/DateLog");
const DateUtil_1 = require("../util/DateUtil");
const CustomError_1 = require("../util/error/CustomError");
class DateLogDaoImpl {
    async getAllDateLogs(authId, startDate, endDate) {
        try {
            const dateLogs = new Array();
            const formattedStartDate = startDate ? new Date(startDate) : null;
            const formattedEndDate = endDate ? new Date(endDate) : DateUtil_1.DateUtil.convertDateToUTC(new Date());
            const documents = formattedStartDate && formattedEndDate ?
                await firebase_1.db.collection('users').doc(authId).collection('dateLogs').where('dateValue', '>=', formattedStartDate.toISOString()).where('dateValue', '<=', formattedEndDate.toISOString()).orderBy('dateValue').get() :
                await firebase_1.db.collection('users').doc(authId).collection('dateLogs').orderBy('dateValue').get();
            documents.forEach(document => {
                const dateLog = new DateLog_1.DateLog(document.id, document.data().date, document.data().foodItems, document.data().components);
                dateLogs.push(dateLog);
            });
            return dateLogs;
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not retrieve date logs from database: " + error);
        }
    }
    async getDateLogsWithFood(authId, food, startDate, endDate) {
        try {
            const dateLogs = new Array();
            const formattedStartDate = startDate ? new Date(startDate) : null;
            const formattedEndDate = endDate ? new Date(endDate) : DateUtil_1.DateUtil.convertDateToUTC(new Date());
            const documents = formattedStartDate && formattedEndDate ?
                await firebase_1.db.collection('users').doc(authId).collection('dateLogs').where('foodItems', 'array-contains', { id: food.id, name: food.name })
                    .where('dateValue', '>=', formattedStartDate.toISOString()).where('dateValue', '<=', formattedEndDate.toISOString()).orderBy('dateValue').get() :
                await firebase_1.db.collection('users').doc(authId).collection('dateLogs').where('foodItems', 'array-contains', { id: food.id, name: food.name })
                    .orderBy('date').get();
            documents.forEach(document => {
                const dateLog = new DateLog_1.DateLog(document.id, document.data().date, document.data().foodItems, document.data().components);
                dateLogs.push(dateLog);
            });
            return dateLogs;
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not retrieve date logs from database: " + error);
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
            throw new CustomError_1.DatabaseError("Could not retrieve date log from database: " + error);
        }
    }
    async addDateLogs(authId, dateLogs) {
        try {
            const existingDateLogs = await this.getAllDateLogs(authId);
            const batch = firebase_1.db.batch();
            for (const dateLog of dateLogs) {
                const matchingDateLog = existingDateLogs.find(existingDateLog => existingDateLog.date === dateLog.date);
                const document = matchingDateLog ?
                    firebase_1.db.collection('users').doc(authId).collection('dateLogs').doc(matchingDateLog.id) :
                    firebase_1.db.collection('users').doc(authId).collection('dateLogs').doc();
                let { id, ...newDateLog } = dateLog;
                batch.set(document, newDateLog);
            }
            await batch.commit();
            return;
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not add date log to database: " + error);
        }
    }
    async updateDateLogs(authId, dateLogId, dateLogData) {
        try {
            const dataToUpdate = dateLogData.toObject ? dateLogData.toObject() : dateLogData;
            await firebase_1.db.collection('users').doc(authId).collection('dateLogs').doc(dateLogId).update(dataToUpdate);
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not update date log in database: " + error);
        }
    }
    async deleteDateLogs(authId, dateLogIds) {
        try {
            const batch = firebase_1.db.batch();
            for (const dateLogId of dateLogIds) {
                const document = firebase_1.db.collection('users').doc(authId).collection('dateLogs').doc(dateLogId);
                batch.delete(document);
            }
            await batch.commit();
        }
        catch (error) {
            throw new CustomError_1.DatabaseError("Could not delete date logs from database: " + error);
        }
    }
}
exports.DateLogDaoImpl = DateLogDaoImpl;
