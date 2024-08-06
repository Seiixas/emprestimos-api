import { AppError } from '!shared/errors/app-error.error';

class DatabaseError extends AppError {
  constructor() {
    super({
      message: 'Erro ao persistir ou consultar em/o banco de dados.',
      internalCode: 'DATABASE_ERROR',
      statusCode: 500,
    });
  }
}

const DATABASE_ERROR = new DatabaseError();

export { DATABASE_ERROR };
