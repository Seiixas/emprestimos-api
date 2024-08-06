"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INSUFFICIENT_INSTALLMENT_VALUE_ERROR = void 0;
const app_error_error_1 = require("../../../shared/errors/app-error.error");
class InsufficientInstallmentValue extends app_error_error_1.AppError {
    constructor() {
        super({
            message: `O valor solicitado é menor que o mínimo permitido`,
            internalCode: 'MINIMUM_INSTALLMENT_NOT_REACHED',
            statusCode: 400,
        });
    }
}
const INSUFFICIENT_INSTALLMENT_VALUE_ERROR = new InsufficientInstallmentValue();
exports.INSUFFICIENT_INSTALLMENT_VALUE_ERROR = INSUFFICIENT_INSTALLMENT_VALUE_ERROR;
