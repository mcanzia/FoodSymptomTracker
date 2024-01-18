"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChartTitle = void 0;
class ChartTitle {
    display;
    text;
    constructor(display, text) {
        this.display = display;
        this.text = text;
    }
    toObject() {
        return {
            display: this.display,
            text: this.text
        };
    }
}
exports.ChartTitle = ChartTitle;
