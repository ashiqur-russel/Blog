"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const statusCode = 400;
    const erroSources = [
        {
            path: err.path,
            message: err.message,
        },
    ];
    return {
        success: false,
        statusCode,
        message: 'Invalid ID',
        error: erroSources,
        stack: err.stack,
    };
};
exports.default = handleCastError;
