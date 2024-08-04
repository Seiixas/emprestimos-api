import { AppError } from '!shared/errors/app-error.error';

class SimulationNotFound extends AppError {
  constructor() {
    super({
      message: 'Simulação não encontrada.',
      internalCode: 'SIMULATION_NOT_FOUND',
      statusCode: 404,
    });
  }
}

const SIMULATION_NOT_FOUND_ERROR = new SimulationNotFound();

export { SIMULATION_NOT_FOUND_ERROR };
