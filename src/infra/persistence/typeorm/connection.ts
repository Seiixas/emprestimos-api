import { DataSource } from 'typeorm';
import { resolve } from 'node:path';

const migrationsDir = resolve(__dirname, 'migrations', '*{.ts,.js}');
const entitiesDir = resolve(
  __dirname,
  '..',
  '..',
  '..',
  'domain',
  '**',
  '*.entity{.ts,.js}',
);
const databaseDir = resolve(__dirname, 'local.sql');

export const dataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  database: databaseDir,
  migrations: [migrationsDir],
  entities: [entitiesDir],
  synchronize: false,
});
