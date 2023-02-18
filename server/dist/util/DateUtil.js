"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateUtil = void 0;
class DateUtil {
    static convertDateToUTC(date) {
        date.setUTCHours(0, 0, 0, 0);
        return date;
    }
}
exports.DateUtil = DateUtil;
