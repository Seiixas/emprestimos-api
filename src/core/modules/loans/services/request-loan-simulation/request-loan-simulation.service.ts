import { INSUFFICIENT_INSTALLMENT_VALUE_ERROR } from '../../errors/insufficient-installment-value';
import { MINIMUM_LOAN_NOT_REACHED_ERROR } from '../../errors/minimum-installment-not-reached';
import { calculateInstallmentAmount } from '../../utils/calculate-installments-amount.util';
import { CacheService } from '!shared/services/cache.service';
import { roundNumber } from '!modules/loans/utils/round-number.util';
import { DATABASE_ERROR } from '!shared/errors/database-error.error';
import { addMonths, compareAsc } from 'date-fns';
import { UNDERAGE_NOT_ALLOWED } from '!modules/loans/errors/underage-not-allowed';
import { DATE_NOT_VALID } from '!modules/loans/errors/date-not-valid';

type TRequestLoanSimulationRequest = {
  cpf: string;
  uf: 'MG' | 'SP' | 'RJ' | 'ES';
  birthday: Date;
  loan: number;
  installments: number;
};

type TRequestLoanSimulationResponse = {
  id: string;
  requestedValue: number;
  interestRate: number;
  installments: number;
  installmentsAmount: number;
  totalInterest: number;
  totalAmount: number;
  bills: {
    id: string;
    outstandingBalance: number;
    interest: number;
    outstandingBalanceAdjusted: number;
    installmentAmount: number;
    due: Date;
  }[];
  cpf: string;
  birthday: Date;
  uf: 'MG' | 'SP' | 'RJ' | 'ES';
};

class RequestLoanSimulationService {
  constructor(private readonly cacheService: CacheService) {}

  async execute({
    cpf,
    birthday,
    uf,
    loan: amount,
    installments,
  }: TRequestLoanSimulationRequest): Promise<TRequestLoanSimulationResponse> {
    const minimumAmountLoanAllowed = 50000;
    const minimumInstallmentsPercentage = 1 / 100; // 1%
    const interestRateByState = {
      MG: 0.01,
      SP: 0.008,
      RJ: 0.009,
      ES: 0.0111,
    };

    const todaysDate = new Date();

    const isBirthdayValid = compareAsc(birthday, todaysDate) === 1;
    if (isBirthdayValid) {
      throw DATE_NOT_VALID;
    }

    const isUnderage = addMonths(birthday, 18) > todaysDate;
    if (isUnderage) {
      throw UNDERAGE_NOT_ALLOWED;
    }

    if (amount < minimumAmountLoanAllowed) {
      throw MINIMUM_LOAN_NOT_REACHED_ERROR;
    }

    if (installments < amount * minimumInstallmentsPercentage) {
      throw INSUFFICIENT_INSTALLMENT_VALUE_ERROR;
    }

    const interestRate = interestRateByState[uf];
    const installmentsAmount = calculateInstallmentAmount({
      interestRate,
      installmentAmount: installments,
      loanAmount: amount,
    });

    let outstandingBalance = amount;
    let totalInterest = 0.0;

    const bills = Array(installmentsAmount)
      .fill({})
      .map((_, index) => {
        const interest = outstandingBalance * interestRate;
        const isLastInstallment = index === installmentsAmount - 1;

        const monthSimulation = {
          id: crypto.randomUUID(),
          outstandingBalance: roundNumber(outstandingBalance, 2),
          interest: roundNumber(interest, 2),
          outstandingBalanceAdjusted: roundNumber(
            outstandingBalance + interest,
            2,
          ),
          installmentAmount: isLastInstallment
            ? roundNumber(outstandingBalance + interest, 2)
            : roundNumber(installments, 2),
          due: addMonths(todaysDate, index + 1),
        };

        totalInterest += monthSimulation.installmentAmount;

        outstandingBalance = outstandingBalance - (installments - interest);

        return monthSimulation;
      });

    const simulation = {
      id: crypto.randomUUID(),
      requestedValue: amount,
      interestRate,
      installments,
      installmentsAmount,
      totalInterest,
      totalAmount: amount + totalInterest,
      bills,
      cpf,
      birthday,
      uf,
    };

    try {
      await this.cacheService.setInCache(simulation.id, simulation);
      return simulation;
    } catch {
      throw DATABASE_ERROR;
    }
  }
}

export { RequestLoanSimulationService, TRequestLoanSimulationResponse };
