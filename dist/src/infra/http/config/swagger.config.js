"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const url = `http://localhost:3000`;
const swaggerConfig = new swagger_1.DocumentBuilder()
    .setTitle('Loan Simulation API')
    .setDescription('API for loan simulation')
    .setVersion('1.0')
    .addServer(url)
    .build();
exports.swaggerConfig = swaggerConfig;
