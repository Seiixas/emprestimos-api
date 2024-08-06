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
exports.RequestLoanSimulationDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RequestLoanSimulationDTO {
}
exports.RequestLoanSimulationDTO = RequestLoanSimulationDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '111111111' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O campo "cpf" não pode ser vazio' }),
    (0, class_validator_1.IsString)({ message: 'O campo "cpf" deve ser uma string' }),
    __metadata("design:type", String)
], RequestLoanSimulationDTO.prototype, "cpf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'MG', enum: ['MG', 'SP', 'ES', 'RJ'] }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O campo "uf" não pode ser vazio' }),
    (0, class_validator_1.IsEnum)(['MG', 'SP', 'ES', 'RJ'], {
        message: 'O campo "uf" deve ser um dos valores: MG, SP, ES, RJ',
    }),
    __metadata("design:type", String)
], RequestLoanSimulationDTO.prototype, "uf", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1990-01-01' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'O campo "birthday" não pode ser vazio' }),
    (0, class_validator_1.IsString)({ message: 'O campo "birthday" deve ser do tipo caracteres' }),
    __metadata("design:type", Date)
], RequestLoanSimulationDTO.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 60000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RequestLoanSimulationDTO.prototype, "loan", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 15000 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RequestLoanSimulationDTO.prototype, "installments", void 0);
