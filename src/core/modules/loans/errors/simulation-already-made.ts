import { AppError } from '!shared/errors/app-error.error';

class SimulationAlreadyMadeError extends AppError {
  constructor() {
    super({
      message: 'Simulação já contratada.',
      internalCode: 'SIMULATION_ALREADY_MADE',
      statusCode: 409,
    });
  }
}

const SIMULATION_ALREADY_MADE_ERROR = new SimulationAlreadyMadeError();

export { SIMULATION_ALREADY_MADE_ERROR };
