"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowLoanSimulationService = void 0;
const simulation_not_found_1 = require("../../errors/simulation-not-found");
class ShowLoanSimulationService {
    constructor(cacheService) {
        this.cacheService = cacheService;
    }
    async execute({ id }) {
        const simulation = await this.cacheService.getFromCache(id);
        if (!simulation) {
            throw simulation_not_found_1.SIMULATION_NOT_FOUND_ERROR;
        }
        return simulation;
    }
}
exports.ShowLoanSimulationService = ShowLoanSimulationService;
