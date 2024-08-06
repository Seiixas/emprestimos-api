"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const loan_repository_1 = require("../../../../domain/loans/loan.repository");
const typeorm_service_1 = require("./typeorm.service");
const typeorm_loans_repository_1 = require("../../../persistence/typeorm/repositories/typeorm-loans.repository");
const connection_1 = require("../../../persistence/typeorm/connection");
const config_1 = require("@nestjs/config");
const bill_repository_1 = require("../../../../domain/bills/bill.repository");
const typeorm_bills_repository_1 = require("../../../persistence/typeorm/repositories/typeorm-bills.repository");
const bill_entity_1 = require("../../../../domain/bills/bill.entity");
const loan_entity_1 = require("../../../../domain/loans/loan.entity");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule.forRoot({ isGlobal: true })],
        providers: [
            typeorm_service_1.TypeOrmService,
            {
                provide: loan_repository_1.LoansRepository,
                useFactory: () => {
                    return new typeorm_loans_repository_1.TypeORMLoansRepository(connection_1.dataSource.getRepository(loan_entity_1.LoanModel));
                },
                inject: [typeorm_service_1.TypeOrmService],
            },
            {
                provide: bill_repository_1.BillsRepository,
                useFactory: () => {
                    return new typeorm_bills_repository_1.TypeORMBillsRepository(connection_1.dataSource.getRepository(bill_entity_1.BillsModel));
                },
                inject: [typeorm_service_1.TypeOrmService],
            },
        ],
        exports: [loan_repository_1.LoansRepository, bill_repository_1.BillsRepository],
    })
], DatabaseModule);
