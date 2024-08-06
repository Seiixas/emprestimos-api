"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMBillsRepository = void 0;
class TypeORMBillsRepository {
    constructor(_repository) {
        this._repository = _repository;
    }
    async bulkSave(bill) {
        await this._repository.save(bill);
    }
}
exports.TypeORMBillsRepository = TypeORMBillsRepository;
