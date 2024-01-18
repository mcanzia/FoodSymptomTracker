"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataSet = void 0;
class DataSet {
    data;
    label;
    constructor(data, label) {
        this.data = data;
        this.label = label;
    }
    toObject() {
        return {
            data: [...this.data],
            label: this.label
        };
    }
}
exports.DataSet = DataSet;
