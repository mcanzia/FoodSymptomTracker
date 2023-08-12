"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler {
    static handleError(error, response) {
        const { name, message } = error;
        response.status(statusCode).json({
            status: "error",
            name,
            message
        });
    }
}
exports.ErrorHandler = ErrorHandler;
