export class DateUtil {
    static convertDateToUTC(date) {
        date.setUTCHours(0, 0, 0, 0);
        return date;
    }
}
//# sourceMappingURL=DateUtil.js.map