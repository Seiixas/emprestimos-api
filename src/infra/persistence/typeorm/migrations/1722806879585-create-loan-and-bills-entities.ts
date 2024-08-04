import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLoanAndBillsEntities1722806879585 implements MigrationInterface {
    name = 'CreateLoanAndBillsEntities1722806879585'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bills_model" (
                "id" varchar PRIMARY KEY NOT NULL,
                "outstanding_balance" integer NOT NULL,
                "interest" integer NOT NULL,
                "outstanding_balance_adjusted" integer NOT NULL,
                "installment_amount" integer NOT NULL,
                "due" datetime NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "loanId" varchar
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "loan_model" (
                "id" varchar PRIMARY KEY NOT NULL,
                "requested_value" integer NOT NULL,
                "interest_rate" integer NOT NULL,
                "installments" integer NOT NULL,
                "installments_amount" integer NOT NULL,
                "total_interest" integer NOT NULL,
                "total_amount" integer NOT NULL,
                "cpf" varchar NOT NULL,
                "uf" varchar NOT NULL,
                "birthday" datetime NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "deleted_at" datetime
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "temporary_bills_model" (
                "id" varchar PRIMARY KEY NOT NULL,
                "outstanding_balance" integer NOT NULL,
                "interest" integer NOT NULL,
                "outstanding_balance_adjusted" integer NOT NULL,
                "installment_amount" integer NOT NULL,
                "due" datetime NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "loanId" varchar,
                CONSTRAINT "FK_b883ce687a477705278273eb6b2" FOREIGN KEY ("loanId") REFERENCES "loan_model" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION
            )
        `);
        await queryRunner.query(`
            INSERT INTO "temporary_bills_model"(
                    "id",
                    "outstanding_balance",
                    "interest",
                    "outstanding_balance_adjusted",
                    "installment_amount",
                    "due",
                    "created_at",
                    "updated_at",
                    "loanId"
                )
            SELECT "id",
                "outstanding_balance",
                "interest",
                "outstanding_balance_adjusted",
                "installment_amount",
                "due",
                "created_at",
                "updated_at",
                "loanId"
            FROM "bills_model"
        `);
        await queryRunner.query(`
            DROP TABLE "bills_model"
        `);
        await queryRunner.query(`
            ALTER TABLE "temporary_bills_model"
                RENAME TO "bills_model"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bills_model"
                RENAME TO "temporary_bills_model"
        `);
        await queryRunner.query(`
            CREATE TABLE "bills_model" (
                "id" varchar PRIMARY KEY NOT NULL,
                "outstanding_balance" integer NOT NULL,
                "interest" integer NOT NULL,
                "outstanding_balance_adjusted" integer NOT NULL,
                "installment_amount" integer NOT NULL,
                "due" datetime NOT NULL,
                "created_at" datetime NOT NULL DEFAULT (datetime('now')),
                "updated_at" datetime NOT NULL DEFAULT (datetime('now')),
                "loanId" varchar
            )
        `);
        await queryRunner.query(`
            INSERT INTO "bills_model"(
                    "id",
                    "outstanding_balance",
                    "interest",
                    "outstanding_balance_adjusted",
                    "installment_amount",
                    "due",
                    "created_at",
                    "updated_at",
                    "loanId"
                )
            SELECT "id",
                "outstanding_balance",
                "interest",
                "outstanding_balance_adjusted",
                "installment_amount",
                "due",
                "created_at",
                "updated_at",
                "loanId"
            FROM "temporary_bills_model"
        `);
        await queryRunner.query(`
            DROP TABLE "temporary_bills_model"
        `);
        await queryRunner.query(`
            DROP TABLE "loan_model"
        `);
        await queryRunner.query(`
            DROP TABLE "bills_model"
        `);
    }

}
