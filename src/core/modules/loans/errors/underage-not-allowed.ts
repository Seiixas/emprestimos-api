import { AppError } from '!shared/errors/app-error.error';

class UnderageNotAllowed extends AppError {
  constructor() {
    super({
      message: 'Menores de 18 anos não podem solicitar empréstimos.',
      internalCode: 'UNDERAGE_NOT_ALLOWED',
      statusCode: 400,
    });
  }
}

const UNDERAGE_NOT_ALLOWED = new UnderageNotAllowed();

export { UNDERAGE_NOT_ALLOWED };
