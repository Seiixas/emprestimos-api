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
exports.BillsModel = void 0;
const loan_entity_1 = require("../loans/loan.entity");
const typeorm_1 = require("typeorm");
let BillsModel = class BillsModel {
};
exports.BillsModel = BillsModel;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], BillsModel.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'outstanding_balance', type: 'numeric' }),
    __metadata("design:type", Number)
], BillsModel.prototype, "outstandingBalance", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'interest', type: 'numeric' }),
    __metadata("design:type", Number)
], BillsModel.prototype, "interest", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'outstanding_balance_adjusted', type: 'numeric' }),
    __metadata("design:type", Number)
], BillsModel.prototype, "outstandingBalanceAdjusted", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'installment_amount', type: 'numeric' }),
    __metadata("design:type", Number)
], BillsModel.prototype, "installmentAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'due' }),
    __metadata("design:type", Date)
], BillsModel.prototype, "due", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ name: 'created_at' }),
    __metadata("design:type", Date)
], BillsModel.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'updated_at' }),
    __metadata("design:type", Date)
], BillsModel.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => loan_entity_1.LoanModel, (loan) => loan.bills, { cascade: true }),
    __metadata("design:type", loan_entity_1.LoanModel)
], BillsModel.prototype, "loan", void 0);
exports.BillsModel = BillsModel = __decorate([
    (0, typeorm_1.Entity)({ name: 'bills' })
], BillsModel);
