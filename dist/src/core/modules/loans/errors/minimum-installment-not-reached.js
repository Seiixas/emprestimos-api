"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MINIMUM_LOAN_NOT_REACHED_ERROR = void 0;
const app_error_error_1 = require("../../../shared/errors/app-error.error");
class MinimumLoanNotReached extends app_error_error_1.AppError {
    constructor() {
        super({
            message: `O valor solicitado é menor que o mínimo permitido`,
            internalCode: 'MINIMUM_INSTALLMENT_NOT_REACHED',
            statusCode: 400,
        });
    }
}
const MINIMUM_LOAN_NOT_REACHED_ERROR = new MinimumLoanNotReached();
exports.MINIMUM_LOAN_NOT_REACHED_ERROR = MINIMUM_LOAN_NOT_REACHED_ERROR;
