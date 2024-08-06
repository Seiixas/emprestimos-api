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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoansController = void 0;
const common_1 = require("@nestjs/common");
const request_loan_simulation_service_1 = require("../../../../../core/modules/loans/services/request-loan-simulation/request-loan-simulation.service");
const request_loan_simulation_dto_1 = require("./dtos/request-loan-simulation.dto");
const swagger_1 = require("@nestjs/swagger");
const insufficient_installment_value_1 = require("../../../../../core/modules/loans/errors/insufficient-installment-value");
const minimum_installment_not_reached_1 = require("../../../../../core/modules/loans/errors/minimum-installment-not-reached");
const show_loan_simulation_service_1 = require("../../../../../core/modules/loans/services/show-loan-simulation/show-loan-simulation.service");
const make_loan_service_1 = require("../../../../../core/modules/loans/services/make-loan/make-loan.service");
const simulation_not_found_1 = require("../../../../../core/modules/loans/errors/simulation-not-found");
const show_loan_service_1 = require("../../../../../core/modules/loans/services/show-loan/show-loan.service");
const simulation_already_made_1 = require("../../../../../core/modules/loans/errors/simulation-already-made");
let LoansController = class LoansController {
    constructor(requestLoanSimulationService, showLoanSimulationService, makeLoanService, showLoanService) {
        this.requestLoanSimulationService = requestLoanSimulationService;
        this.showLoanSimulationService = showLoanSimulationService;
        this.makeLoanService = makeLoanService;
        this.showLoanService = showLoanService;
    }
    async requestLoanSimulation(requestLoanSimulationDTO) {
        return await this.requestLoanSimulationService.execute(requestLoanSimulationDTO);
    }
    async showLoanSimulation(id) {
        return await this.showLoanSimulationService.execute({
            id,
        });
    }
    async makeLoan(id) {
        return await this.makeLoanService.execute({
            simulationId: id,
        });
    }
    async showLoan(id) {
        return await this.showLoanService.execute({
            id,
        });
    }
};
exports.LoansController = LoansController;
__decorate([
    (0, common_1.Post)('/simulation'),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Loan simulation requested.' }),
    (0, swagger_1.ApiResponse)({
        status: insufficient_installment_value_1.INSUFFICIENT_INSTALLMENT_VALUE_ERROR.statusCode,
        description: insufficient_installment_value_1.INSUFFICIENT_INSTALLMENT_VALUE_ERROR.message,
    }),
    (0, swagger_1.ApiResponse)({
        status: minimum_installment_not_reached_1.MINIMUM_LOAN_NOT_REACHED_ERROR.statusCode,
        description: minimum_installment_not_reached_1.MINIMUM_LOAN_NOT_REACHED_ERROR.message,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [request_loan_simulation_dto_1.RequestLoanSimulationDTO]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "requestLoanSimulation", null);
__decorate([
    (0, common_1.Get)('/simulation/:id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Loan simulation found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "showLoanSimulation", null);
__decorate([
    (0, common_1.Post)('/:id'),
    (0, swagger_1.ApiResponse)({
        status: simulation_not_found_1.SIMULATION_NOT_FOUND_ERROR.statusCode,
        description: simulation_not_found_1.SIMULATION_NOT_FOUND_ERROR.message,
    }),
    (0, swagger_1.ApiResponse)({
        status: simulation_already_made_1.SIMULATION_ALREADY_MADE_ERROR.statusCode,
        description: simulation_already_made_1.SIMULATION_ALREADY_MADE_ERROR.message,
    }),
    (0, swagger_1.ApiCreatedResponse)({ description: 'Loan requested.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "makeLoan", null);
__decorate([
    (0, common_1.Get)('/:id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Loan found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LoansController.prototype, "showLoan", null);
exports.LoansController = LoansController = __decorate([
    (0, swagger_1.ApiTags)('Loans'),
    (0, common_1.Controller)('loans'),
    __metadata("design:paramtypes", [request_loan_simulation_service_1.RequestLoanSimulationService,
        show_loan_simulation_service_1.ShowLoanSimulationService,
        make_loan_service_1.MakeLoanService,
        show_loan_service_1.ShowLoanService])
], LoansController);
