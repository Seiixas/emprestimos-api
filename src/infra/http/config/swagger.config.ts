import { DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';

type SwaggerConfig = Omit<OpenAPIObject, 'paths'>;

const url = `http://localhost:3000`;

const swaggerConfig: SwaggerConfig = new DocumentBuilder()
  .setTitle('Loan Simulation API')
  .setDescription('API for loan simulation')
  .setVersion('1.0')
  .addServer(url)
  .build();

export { swaggerConfig };
