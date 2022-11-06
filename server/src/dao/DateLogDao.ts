import { db } from '../configs/firebase';
import util from 'util';
import { DateLog } from '../models/DateLog';
import { FoodItem } from '../models/FoodItem';

export class DateLogDao {

    async getAllDateLogs(authId : any, startDate? : string, endDate? : string) {   
        try {     
            const dateLogs : Array<DateLog> =  new Array<DateLog>();
            const documents = await db.collection('users').doc(authId).collection('dateLogs').orderBy('date').get();
            documents.forEach(document => {
                const dateLog : DateLog = new DateLog(document.id, document.data().date, document.data().foodItems, document.data().components);
                dateLogs.push(dateLog);
            });
            return dateLogs;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getDateLogsWithFood(authId : any, food : FoodItem, startDate? : string, endDate? : string) {    
        try {
            const dateLogs : Array<DateLog> =  new Array<DateLog>();
            const documents = await db.collection('users').doc(authId).collection('dateLogs').where('foodItems', 'array-contains', { id: food.id, name: food.name }).orderBy('date').get();
            documents.forEach(document => {
                const dateLog : DateLog = new DateLog(document.id, document.data().date, document.data().foodItems, document.data().components);
                dateLogs.push(dateLog);
            });
            return dateLogs;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async getDateLogById(authId : any, dateLogId : string) {    
        try {    
            const document = await db.collection('users').doc(authId).collection('dateLogs').doc(dateLogId).get();
            const documentData : any = document.data();
            const dateLog : DateLog = new DateLog(document.id, documentData.date, documentData.foodItems, documentData.components);
            return dateLog;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async addDateLogs(authId : any, dateLogs : Array<DateLog>) {
        try {
            const existingDateLogs : Array<DateLog> = await this.getAllDateLogs(authId);
            const batch = db.batch();
            for (const dateLog of dateLogs) {
                if (!dateLog.id) {
                    const matchingDateLog = existingDateLogs.find(existingDateLog => existingDateLog.date === dateLog.date);
                    if (matchingDateLog) {
                        console.log('already exists');
                        continue;
                    }
                    const document = db.collection('users').doc(authId).collection('dateLogs').doc();
                    let {id, ...newDateLog } = dateLog;
                    console.log('new dateLog');
                    batch.set(document, newDateLog);
                }
            }
            await batch.commit();
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async updateDateLogs(authId : any, dateLogId : string, dateLogData : DateLog) {
        try {
            await db.collection('users').doc(authId).collection('dateLogs').doc(dateLogId).update(dateLogData);
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

}