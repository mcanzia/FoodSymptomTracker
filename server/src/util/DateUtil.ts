export class DateUtil {

    static convertDateToUTC(date : Date) {  
        //const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getHours(), date.getUTCMinutes() - date.getTimezoneOffset(), date.getUTCSeconds());
        date.setUTCHours(0,0,0,0);
        return date;
    }
}