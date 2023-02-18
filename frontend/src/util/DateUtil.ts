export class DateUtil {

    static convertDateToUTC(date : Date) {  
        date.setUTCHours(0,0,0,0);
        return date;
    }
}