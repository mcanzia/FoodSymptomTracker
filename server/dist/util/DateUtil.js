"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
class DateUtil {
    static convertDateToUTC(date) {
        //const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getHours(), date.getUTCMinutes() - date.getTimezoneOffset(), date.getUTCSeconds());
        date.setUTCHours(0, 0, 0, 0);
        return date;
    }
}
exports.DateUtil = DateUtil;
