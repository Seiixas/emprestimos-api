"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestLoanSimulationService = void 0;
const insufficient_installment_value_1 = require("../../errors/insufficient-installment-value");
const minimum_installment_not_reached_1 = require("../../errors/minimum-installment-not-reached");
const calculate_installments_amount_util_1 = require("../../utils/calculate-installments-amount.util");
const round_number_util_1 = require("../../utils/round-number.util");
class RequestLoanSimulationService {
    constructor(cacheService) {
        this.cacheService = cacheService;
    }
    async execute({ cpf, birthday, uf, loan: amount, installments, }) {
        const minimumAmountLoanAllowed = 50000;
        const minimumInstallmentsPercentage = 1 / 100; // 1%
        const interestRateByState = {
            MG: 0.01,
            SP: 0.008,
            RJ: 0.009,
            ES: 0.0111,
        };
        const todaysDate = new Date();
        if (amount < minimumAmountLoanAllowed) {
            throw minimum_installment_not_reached_1.MINIMUM_LOAN_NOT_REACHED_ERROR;
        }
        if (installments < amount * minimumInstallmentsPercentage) {
            throw insufficient_installment_value_1.INSUFFICIENT_INSTALLMENT_VALUE_ERROR;
        }
        const interestRate = interestRateByState[uf];
        const installmentsAmount = (0, calculate_installments_amount_util_1.calculateInstallmentAmount)({
            interestRate,
            installmentAmount: installments,
            loanAmount: amount,
        });
        let outstandingBalance = amount;
        let totalInterest = 0.0;
        const bills = Array(installmentsAmount)
            .fill({})
            .map((_, index) => {
            const interest = outstandingBalance * interestRate;
            const isLastInstallment = index === installmentsAmount - 1;
            const monthSimulation = {
                id: crypto.randomUUID(),
                outstandingBalance: (0, round_number_util_1.roundNumber)(outstandingBalance, 2),
                interest: (0, round_number_util_1.roundNumber)(interest, 2),
                outstandingBalanceAdjusted: (0, round_number_util_1.roundNumber)(outstandingBalance + interest, 2),
                installmentAmount: isLastInstallment
                    ? (0, round_number_util_1.roundNumber)(outstandingBalance + interest, 2)
                    : (0, round_number_util_1.roundNumber)(installments, 2),
                due: new Date(todaysDate.setMonth(todaysDate.getMonth() + index)),
            };
            totalInterest += monthSimulation.installmentAmount;
            outstandingBalance = outstandingBalance - (installments - interest);
            return monthSimulation;
        });
        const simulation = {
            id: crypto.randomUUID(),
            requestedValue: amount,
            interestRate,
            installments,
            installmentsAmount,
            totalInterest,
            totalAmount: amount + totalInterest,
            bills,
            cpf,
            birthday,
            uf,
        };
        await this.cacheService.setInCache(simulation.id, simulation);
        return simulation;
    }
}
exports.RequestLoanSimulationService = RequestLoanSimulationService;
