"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIMULATION_ALREADY_MADE_ERROR = void 0;
const app_error_error_1 = require("../../../shared/errors/app-error.error");
class SimulationAlreadyMadeError extends app_error_error_1.AppError {
    constructor() {
        super({
            message: 'Simulação já contratada.',
            internalCode: 'SIMULATION_ALREADY_MADE',
            statusCode: 409,
        });
    }
}
const SIMULATION_ALREADY_MADE_ERROR = new SimulationAlreadyMadeError();
exports.SIMULATION_ALREADY_MADE_ERROR = SIMULATION_ALREADY_MADE_ERROR;
