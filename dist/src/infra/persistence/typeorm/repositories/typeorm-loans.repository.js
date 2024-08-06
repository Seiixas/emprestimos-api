"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMLoansRepository = void 0;
class TypeORMLoansRepository {
    constructor(_repository) {
        this._repository = _repository;
    }
    async save(loan) {
        await this._repository.save(loan);
    }
    async findById(id) {
        const loan = await this._repository.findOne({
            where: { id },
            relations: ['bills'],
        });
        return loan;
    }
    async findAll() {
        const loans = await this._repository.find();
        return loans;
    }
}
exports.TypeORMLoansRepository = TypeORMLoansRepository;
