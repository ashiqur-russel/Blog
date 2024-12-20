"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleMongooseValidationError = (err) => {
    const statusCode = 400;
    const errorSources = Object.values(err.errors).map((val) => {
        return {
            path: val === null || val === void 0 ? void 0 : val.path,
            message: val === null || val === void 0 ? void 0 : val.message,
        };
    });
    return {
        success: false,
        statusCode,
        message: 'Validation Error',
        err: errorSources,
    };
};
exports.default = handleMongooseValidationError;
