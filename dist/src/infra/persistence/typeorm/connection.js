"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
require("dotenv/config");
const typeorm_1 = require("typeorm");
const node_path_1 = require("node:path");
const migrationsDir = (0, node_path_1.resolve)(__dirname, 'migrations', '*{.ts,.js}');
const entitiesDir = (0, node_path_1.resolve)(__dirname, '..', '..', '..', 'domain', '**', '*.entity{.ts,.js}');
const databaseDir = (0, node_path_1.resolve)(__dirname, 'local.sql');
exports.dataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: 'adads',
    database: databaseDir,
    migrations: [migrationsDir],
    entities: [entitiesDir],
    synchronize: false,
});
