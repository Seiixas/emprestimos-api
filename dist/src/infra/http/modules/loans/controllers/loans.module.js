"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoansModule = void 0;
const common_1 = require("@nestjs/common");
const loans_controller_1 = require("./loans.controller");
const show_loan_simulation_service_1 = require("../../../../../core/modules/loans/services/show-loan-simulation/show-loan-simulation.service");
const request_loan_simulation_service_1 = require("../../../../../core/modules/loans/services/request-loan-simulation/request-loan-simulation.service");
const cache_service_1 = require("../../../../../core/shared/services/cache.service");
const cache_module_1 = require("../../cache/cache.module");
const make_loan_service_1 = require("../../../../../core/modules/loans/services/make-loan/make-loan.service");
const loan_repository_1 = require("../../../../../domain/loans/loan.repository");
const database_module_1 = require("../../database/database.module");
const show_loan_service_1 = require("../../../../../core/modules/loans/services/show-loan/show-loan.service");
const bill_repository_1 = require("../../../../../domain/bills/bill.repository");
let LoansModule = class LoansModule {
};
exports.LoansModule = LoansModule;
exports.LoansModule = LoansModule = __decorate([
    (0, common_1.Module)({
        controllers: [loans_controller_1.LoansController],
        providers: [
            {
                provide: request_loan_simulation_service_1.RequestLoanSimulationService,
                useFactory: (cacheService) => new request_loan_simulation_service_1.RequestLoanSimulationService(cacheService),
                inject: [cache_service_1.CacheService],
            },
            {
                provide: show_loan_simulation_service_1.ShowLoanSimulationService,
                useFactory: (cacheService) => new show_loan_simulation_service_1.ShowLoanSimulationService(cacheService),
                inject: [cache_service_1.CacheService],
            },
            {
                provide: make_loan_service_1.MakeLoanService,
                useFactory: (cacheService, loansRepository, billsRepository) => new make_loan_service_1.MakeLoanService(cacheService, loansRepository, billsRepository),
                inject: [cache_service_1.CacheService, loan_repository_1.LoansRepository, bill_repository_1.BillsRepository],
            },
            {
                provide: show_loan_service_1.ShowLoanService,
                useFactory: (loansRepository) => new show_loan_service_1.ShowLoanService(loansRepository),
                inject: [loan_repository_1.LoansRepository],
            },
        ],
        imports: [cache_module_1.CacheModule, database_module_1.DatabaseModule],
    })
], LoansModule);
