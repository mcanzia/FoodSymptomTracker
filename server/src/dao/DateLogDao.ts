import { db, documentId } from '../configs/firebase';
import util from 'util';
import { DateLog } from '../models/DateLog';
import { DateUtil } from '../util/DateUtil';
import { FoodItem } from '../models/FoodItem';
import { DatabaseError } from '../util/error/CustomError';

export interface DateLogDao {

    getAllDateLogs(authId : any, startDate? : string, endDate? : string) : Promise<DateLog[]>;
    getDateLogsWithFood(authId : any, food : FoodItem, startDate? : string, endDate? : string) : Promise<DateLog[]>;
    getDateLogById(authId : any, dateLogId : string) : Promise<DateLog>;
    addDateLogs(authId : any, dateLogs : Array<DateLog>) : void;
    updateDateLogs(authId : any, dateLogId : string, dateLogData : DateLog) : void;
    deleteDateLogs(authId : any, dateLogIds : Array<string>) : void;

}