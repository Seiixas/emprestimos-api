import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateLoanAndBillsEntities1722915800800 implements MigrationInterface {
    name = 'CreateLoanAndBillsEntities1722915800800'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "bills" (
                "id" character varying NOT NULL,
                "outstanding_balance" numeric NOT NULL,
                "interest" numeric NOT NULL,
                "outstanding_balance_adjusted" numeric NOT NULL,
                "installment_amount" numeric NOT NULL,
                "due" TIMESTAMP NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "loanId" character varying,
                CONSTRAINT "PK_a56215dfcb525755ec832cc80b7" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "loans" (
                "id" character varying NOT NULL,
                "requested_value" numeric NOT NULL,
                "interest_rate" numeric NOT NULL,
                "installments" numeric NOT NULL,
                "installment_amount" integer NOT NULL,
                "total_interest" numeric NOT NULL,
                "total_amount" numeric NOT NULL,
                "cpf" character varying NOT NULL,
                "uf" character varying NOT NULL,
                "birthday" TIMESTAMP NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "deleted_at" TIMESTAMP,
                CONSTRAINT "PK_5c6942c1e13e4de135c5203ee61" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "bills"
            ADD CONSTRAINT "FK_7fc6a5c6f2d0c7eaa0e45652d9b" FOREIGN KEY ("loanId") REFERENCES "loans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "bills" DROP CONSTRAINT "FK_7fc6a5c6f2d0c7eaa0e45652d9b"
        `);
        await queryRunner.query(`
            DROP TABLE "loans"
        `);
        await queryRunner.query(`
            DROP TABLE "bills"
        `);
    }

}
