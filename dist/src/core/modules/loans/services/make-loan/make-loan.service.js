"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeLoanService = void 0;
const simulation_not_found_1 = require("../../errors/simulation-not-found");
const loan_entity_1 = require("../../../../../domain/loans/loan.entity");
const bill_entity_1 = require("../../../../../domain/bills/bill.entity");
const simulation_already_made_1 = require("../../errors/simulation-already-made");
const date_fns_1 = require("date-fns");
class MakeLoanService {
    constructor(cacheService, loansRepository, billsRepository) {
        this.cacheService = cacheService;
        this.loansRepository = loansRepository;
        this.billsRepository = billsRepository;
    }
    async execute({ simulationId }) {
        const simulation = await this.cacheService.getFromCache(simulationId);
        const simulationAlreadyMade = await this.loansRepository.findById(simulation.id);
        if (simulationAlreadyMade) {
            throw simulation_already_made_1.SIMULATION_ALREADY_MADE_ERROR;
        }
        if (!simulation) {
            throw simulation_not_found_1.SIMULATION_NOT_FOUND_ERROR;
        }
        const { uf, installments, cpf, birthday, bills, installmentsAmount, totalInterest, requestedValue, totalAmount, id, interestRate, } = simulation;
        const loan = new loan_entity_1.LoanModel();
        Object.assign(loan, {
            id,
            uf,
            installments,
            cpf,
            birthday: (0, date_fns_1.parse)(String(birthday), 'dd/MM/yyyy', new Date()),
            installmentAmount: installmentsAmount,
            totalInterest,
            requestedValue,
            totalAmount,
            interestRate,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        const billEntities = bills.map((bill) => {
            const billEntity = new bill_entity_1.BillsModel();
            Object.assign(billEntity, {
                id: bill.id,
                outstandingBalance: bill.outstandingBalance,
                interest: bill.interest,
                outstandingBalanceAdjusted: bill.outstandingBalanceAdjusted,
                installmentAmount: bill.installmentAmount,
                due: new Date(bill.due),
                createdAt: new Date(),
                updatedAt: new Date(),
                loan,
            });
            return billEntity;
        });
        await this.billsRepository.bulkSave(billEntities);
        await this.loansRepository.save(loan);
        await this.cacheService.deleteFromCache(simulationId);
    }
}
exports.MakeLoanService = MakeLoanService;
