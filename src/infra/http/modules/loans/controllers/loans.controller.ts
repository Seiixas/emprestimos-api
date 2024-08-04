import { Body, Controller, Post } from '@nestjs/common';
import { RequestLoanSimulationService } from 'src/core/modules/loans/services/request-loan-simulation/request-loan-simulation.service';
import { RequestLoanSimulationDTO } from './dtos/request-loan-simulation.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { INSUFFICIENT_INSTALLMENT_VALUE_ERROR } from 'src/core/modules/loans/errors/insufficient-installment-value';
import { MINIMUM_LOAN_NOT_REACHED_ERROR } from 'src/core/modules/loans/errors/minimum-installment-not-reached';

@ApiTags('Loans')
@Controller('loans')
export class LoansController {
  constructor(
    private readonly requestLoanSimulationService: RequestLoanSimulationService,
  ) {}

  @Post()
  @ApiCreatedResponse({ description: 'Loan simulation requested.' })
  @ApiResponse({
    status: INSUFFICIENT_INSTALLMENT_VALUE_ERROR.statusCode,
    description: INSUFFICIENT_INSTALLMENT_VALUE_ERROR.message,
  })
  @ApiResponse({
    status: MINIMUM_LOAN_NOT_REACHED_ERROR.statusCode,
    description: MINIMUM_LOAN_NOT_REACHED_ERROR.message,
  })
  async requestLoanSimulation(
    @Body() requestLoanSimulationDTO: RequestLoanSimulationDTO,
  ) {
    return await this.requestLoanSimulationService.execute(
      requestLoanSimulationDTO,
    );
  }
}
