"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = void 0;
class Option {
    text;
    value;
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
    toObject() {
        return {
            text: this.text,
            value: this.value
        };
    }
}
exports.Option = Option;
