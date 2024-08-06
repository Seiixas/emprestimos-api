"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShowLoanService = void 0;
const simulation_not_found_1 = require("../../errors/simulation-not-found");
class ShowLoanService {
    constructor(loansRepository) {
        this.loansRepository = loansRepository;
    }
    async execute({ id }) {
        const loan = await this.loansRepository.findById(id);
        if (!loan) {
            throw simulation_not_found_1.SIMULATION_NOT_FOUND_ERROR;
        }
        return loan;
    }
}
exports.ShowLoanService = ShowLoanService;
