"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryBillsRepository = void 0;
class InMemoryBillsRepository {
    constructor() {
        this.bills = [];
    }
    async bulkSave(bill) {
        this.bills.push(...bill);
    }
}
exports.InMemoryBillsRepository = InMemoryBillsRepository;
