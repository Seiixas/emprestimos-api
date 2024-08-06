"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateInstallmentAmount = calculateInstallmentAmount;
function calculateInstallmentAmount({ interestRate, installmentAmount, loanAmount, }) {
    const installment = Math.log(installmentAmount / (installmentAmount - loanAmount * interestRate)) / Math.log(1 + interestRate);
    return Math.ceil(installment);
}
