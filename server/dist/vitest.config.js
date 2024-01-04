"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        {
            name: 'food-tracker-tests'
        },
    ],
    test: {
        hookTimeout: 50000,
    },
});
