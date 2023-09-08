"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartData = void 0;
class ChartData {
    datasets;
    labels;
    constructor(datasets, labels) {
        this.datasets = datasets ? datasets : new Array;
        this.labels = labels ? labels : new Array;
    }
}
exports.ChartData = ChartData;
