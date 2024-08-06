"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
class AppError {
    constructor(props) {
        this._message = props.message;
        this._httpStatusCode = props.statusCode ?? 400;
        this._data = props.data;
        this._internalCode = props.internalCode;
    }
    get statusCode() {
        return this._httpStatusCode;
    }
    get code() {
        return this._internalCode;
    }
    get message() {
        return this._message;
    }
}
exports.AppError = AppError;
