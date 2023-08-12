import { DateLog } from "../models/DateLog";
export class DateLogController {
    async getAllDateLogs(userAuthToken : any) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/datelogs', {
                    method: 'GET',
                    headers: {
                        'Authorization': bearer
                    }
                })
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async getDateLogById(userAuthToken : any, dateLogId : string) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/datelogs/' + dateLogId, {
                    method: 'GET',
                    headers: {
                        'Authorization': bearer
                    }
                })
            return response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async addDateLogs(userAuthToken : any, dateLogs : Array<DateLog>) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/datelogs', {
                method: 'POST',
                headers: {
                    'Authorization': bearer,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dateLogs)
            })
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async updateDateLog(userAuthToken : any, dateLog : DateLog) {
        try {
            const bearer : string = 'Bearer ' + userAuthToken;
            const response = await fetch('http://localhost:7500/api/datelogs/' + dateLog.id, {
                method: 'PUT',
                headers: {
                    'Authorization': bearer,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dateLog)
            })
            console.log(response.json());
        } catch (error) {
            console.log(error);
        }
    }
}
