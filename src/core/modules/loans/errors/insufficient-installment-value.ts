import { AppError } from '../../../shared/errors/app-error.error';

class InsufficientInstallmentValue extends AppError {
  constructor() {
    super({
      message: `O valor solicitado é menor que o mínimo permitido`,
      internalCode: 'MINIMUM_INSTALLMENT_NOT_REACHED',
      statusCode: 400,
    });
  }
}

const INSUFFICIENT_INSTALLMENT_VALUE_ERROR = new InsufficientInstallmentValue();

export { INSUFFICIENT_INSTALLMENT_VALUE_ERROR };
