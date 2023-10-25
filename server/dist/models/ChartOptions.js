"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartOptions = void 0;
class ChartOptions {
    plugins;
    constructor(plugins) {
        this.plugins = plugins;
    }
    toObject() {
        return {
            plugins: this.plugins.toObject ? this.plugins.toObject() : this.plugins
        };
    }
}
exports.ChartOptions = ChartOptions;
