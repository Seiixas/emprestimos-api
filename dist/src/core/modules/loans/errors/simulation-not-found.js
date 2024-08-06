"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SIMULATION_NOT_FOUND_ERROR = void 0;
const app_error_error_1 = require("../../../shared/errors/app-error.error");
class SimulationNotFound extends app_error_error_1.AppError {
    constructor() {
        super({
            message: 'Simulação não encontrada.',
            internalCode: 'SIMULATION_NOT_FOUND',
            statusCode: 404,
        });
    }
}
const SIMULATION_NOT_FOUND_ERROR = new SimulationNotFound();
exports.SIMULATION_NOT_FOUND_ERROR = SIMULATION_NOT_FOUND_ERROR;
