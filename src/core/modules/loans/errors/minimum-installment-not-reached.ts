import { AppError } from '!shared/errors/app-error.error';

class MinimumLoanNotReached extends AppError {
  constructor() {
    super({
      message: `O valor solicitado é menor que o mínimo permitido`,
      internalCode: 'MINIMUM_INSTALLMENT_NOT_REACHED',
      statusCode: 400,
    });
  }
}

const MINIMUM_LOAN_NOT_REACHED_ERROR = new MinimumLoanNotReached();

export { MINIMUM_LOAN_NOT_REACHED_ERROR };
