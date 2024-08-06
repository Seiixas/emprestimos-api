"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryLoansRepository = void 0;
class InMemoryLoansRepository {
    constructor() {
        this.loans = [];
    }
    async save(loan) {
        this.loans.push(loan);
    }
    async findById(id) {
        return this.loans.find((loan) => loan.id === id) || null;
    }
    async findAll() {
        return this.loans;
    }
}
exports.InMemoryLoansRepository = InMemoryLoansRepository;
