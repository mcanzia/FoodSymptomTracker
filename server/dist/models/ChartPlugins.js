"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartPlugins = void 0;
class ChartPlugins {
    title;
    constructor(title) {
        this.title = title;
    }
    toObject() {
        return {
            title: this.title.toObject ? this.title.toObject() : this.title
        };
    }
}
exports.ChartPlugins = ChartPlugins;
