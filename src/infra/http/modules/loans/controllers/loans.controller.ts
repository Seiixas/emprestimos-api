import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RequestLoanSimulationService } from '!modules/loans/services/request-loan-simulation/request-loan-simulation.service';
import { RequestLoanSimulationDTO } from './dtos/request-loan-simulation.dto';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { INSUFFICIENT_INSTALLMENT_VALUE_ERROR } from '!modules/loans/errors/insufficient-installment-value';
import { MINIMUM_LOAN_NOT_REACHED_ERROR } from '!modules/loans/errors/minimum-installment-not-reached';
import { ShowLoanSimulationService } from '!modules/loans/services/show-loan-simulation/show-loan-simulation.service';
import { MakeLoanService } from '!modules/loans/services/make-loan/make-loan.service';
import { SIMULATION_NOT_FOUND_ERROR } from '!modules/loans/errors/simulation-not-found';
import { ShowLoanService } from '!modules/loans/services/show-loan/show-loan.service';
import { SIMULATION_ALREADY_MADE_ERROR } from '!modules/loans/errors/simulation-already-made';
import { ListAllLoansService } from '!modules/loans/services/list-all-loans/list-all-loans.service';

@ApiTags('Loans')
@Controller('loans')
export class LoansController {
  constructor(
    private readonly requestLoanSimulationService: RequestLoanSimulationService,
    private readonly showLoanSimulationService: ShowLoanSimulationService,
    private readonly makeLoanService: MakeLoanService,
    private readonly showLoanService: ShowLoanService,
    private readonly listLoansService: ListAllLoansService,
  ) {}

  @Post('/simulation')
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

  @Get('/simulation/:id')
  @ApiResponse({
    status: 200,
    description: 'Loan simulation found.',
  })
  async showLoanSimulation(@Param('id') id: string) {
    return await this.showLoanSimulationService.execute({
      id,
    });
  }

  @Post('/:id')
  @ApiResponse({
    status: SIMULATION_NOT_FOUND_ERROR.statusCode,
    description: SIMULATION_NOT_FOUND_ERROR.message,
  })
  @ApiResponse({
    status: SIMULATION_ALREADY_MADE_ERROR.statusCode,
    description: SIMULATION_ALREADY_MADE_ERROR.message,
  })
  @ApiCreatedResponse({ description: 'Loan requested.' })
  async makeLoan(@Param('id') id: string) {
    return await this.makeLoanService.execute({
      simulationId: id,
    });
  }

  @Get('/:id')
  @ApiResponse({
    status: 200,
    description: 'Loan found.',
  })
  @ApiResponse({
    status: SIMULATION_NOT_FOUND_ERROR.statusCode,
    description: SIMULATION_NOT_FOUND_ERROR.message,
  })
  async showLoan(@Param('id') id: string) {
    return await this.showLoanService.execute({
      id,
    });
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Loans found.',
  })
  async listLoans() {
    return await this.listLoansService.execute();
  }
}
