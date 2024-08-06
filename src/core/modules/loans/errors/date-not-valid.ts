import { AppError } from '!shared/errors/app-error.error';

class DateNotValid extends AppError {
  constructor() {
    super({
      message: 'A data não pode ser maior que a data de hoje',
      internalCode: 'DATE_NOT_VALID',
      statusCode: 400,
    });
  }
}

const DATE_NOT_VALID = new DateNotValid();

export { DATE_NOT_VALID };
