"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartData = void 0;
class ChartData {
    constructor(startDate, endDate, datasets, labels) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.datasets = datasets ? datasets : new Array;
        this.labels = labels ? labels : new Array;
    }
}
exports.ChartData = ChartData;
