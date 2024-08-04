import { INSUFFICIENT_INSTALLMENT_VALUE_ERROR } from '../../errors/insufficient-installment-value';
import { MINIMUM_LOAN_NOT_REACHED_ERROR } from '../../errors/minimum-installment-not-reached';
import { calculateInstallmentAmount } from '../../utils/calculate-installments-amount.util';

type Request = {
  cpf: string;
  uf: 'MG' | 'SP' | 'RJ' | 'ES';
  birthDate: Date;
  amount: number;
  installments: number;
};

type Response = {
  id: string;
  requestedValue: number;
  interestRate: number;
  installments: number;
  installmentsAmount: number;
  totalInterest: number;
  totalAmount: number;
  simulation: {
    outstandingBalance: number;
    interest: number;
    outstandingBalanceAdjusted: number;
    installmentAmount: number;
    due: Date;
  }[];
};

class RequestLoanSimulationService {
  async execute({ uf, amount, installments }: Request): Promise<Response> {
    const minimumAmountLoanAllowed = 50000;
    const minimumInstallmentsPercentage = 1 / 100; // 1%
    const interestRateByState = {
      MG: 0.01,
      SP: 0.008,
      RJ: 0.009,
      ES: 0.0111,
    };

    const todaysDate = new Date();

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

    const simulation = Array(installmentsAmount)
      .fill({})
      .map((_, index) => {
        const interest = outstandingBalance * interestRate;
        const isLastInstallment = index === installmentsAmount - 1;

        const monthSimulation = {
          outstandingBalance,
          interest,
          outstandingBalanceAdjusted: outstandingBalance + interest,
          installmentAmount: isLastInstallment
            ? outstandingBalance + interest
            : installments,
          due: new Date(todaysDate.setMonth(todaysDate.getMonth() + index)),
        };

        totalInterest += monthSimulation.installmentAmount;

        outstandingBalance = outstandingBalance - (installments - interest);

        return monthSimulation;
      });

    const id = crypto.randomUUID();

    return {
      id,
      requestedValue: amount,
      interestRate: interestRate * 100,
      installments,
      installmentsAmount,
      totalInterest,
      totalAmount: amount + totalInterest,
      simulation,
    };
  }
}

export { RequestLoanSimulationService };
