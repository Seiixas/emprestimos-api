"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoanModel = void 0;
const bill_entity_1 = require("../bills/bill.entity");
const typeorm_1 = require("typeorm");
let LoanModel = class LoanModel {
};
exports.LoanModel = LoanModel;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], LoanModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'requested_value', type: 'numeric' }),
    __metadata("design:type", Number)
], LoanModel.prototype, "requestedValue", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'interest_rate', type: 'numeric' }),
    __metadata("design:type", Number)
], LoanModel.prototype, "interestRate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'installments', type: 'numeric' }),
    __metadata("design:type", Number)
], LoanModel.prototype, "installments", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'installment_amount' }),
    __metadata("design:type", Number)
], LoanModel.prototype, "installmentAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_interest', type: 'numeric' }),
    __metadata("design:type", Number)
], LoanModel.prototype, "totalInterest", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'total_amount', type: 'numeric' }),
    __metadata("design:type", Number)
], LoanModel.prototype, "totalAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cpf' }),
    __metadata("design:type", String)
], LoanModel.prototype, "cpf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'uf' }),
    __metadata("design:type", String)
], LoanModel.prototype, "uf", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'birthday' }),
    __metadata("design:type", Date)
], LoanModel.prototype, "birthday", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], LoanModel.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], LoanModel.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.DeleteDateColumn)({ name: 'deleted_at' }),
    __metadata("design:type", Date)
], LoanModel.prototype, "deletedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bill_entity_1.BillsModel, (bills) => bills.loan),
    __metadata("design:type", Array)
], LoanModel.prototype, "bills", void 0);
exports.LoanModel = LoanModel = __decorate([
    (0, typeorm_1.Entity)({ name: 'loans' })
], LoanModel);
