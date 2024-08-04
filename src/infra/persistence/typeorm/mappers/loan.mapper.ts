import { LoanEntity } from '!domain/loans/loan.entity';
import { LoanModel } from '../models/loan.model';
import { BillEntity } from '!domain/biils/bill.entity';

export class LoanMapper {
  public static toTypeORM(loan: LoanEntity | Partial<LoanEntity>): LoanModel {
    const loanModel = new LoanModel();

    Object.assign(loanModel, {
      bills: loan.bills.map((bill) => ({
        id: bill.id,
        due: bill.due,
        installmentAmount: bill.installmentAmount,
        interest: bill.interest,
        outstandingBalance: bill.outstandingBalance,
        outstandingBalanceAdjusted: bill.outstandingBalanceAdjusted,
        loan: loanModel,
        createdAt: bill.createdAt,
        updatedAt: bill.updatedAt,
        deletedAt: bill.deletedAt,
      })),
      ...loan,
    });

    return loanModel;
  }

  public static toLocal(loan: LoanModel): LoanEntity {
    const loanEntity = new LoanEntity({
      id: loan.id,
      requestedValue: loan.requestedValue,
      interestRate: loan.interestRate,
      installments: loan.installments,
      installmentsAmount: loan.installmentsAmount,
      totalInterest: loan.totalInterest,
      totalAmount: loan.totalAmount,
      cpf: loan.cpf,
      uf: loan.uf,
      birthday: loan.birthday,
      bills: loan.bills
        ? loan.bills.map(
            (bill) =>
              new BillEntity({
                id: bill.id,
                due: bill.due,
                installmentAmount: bill.installmentAmount,
                interest: bill.interest,
                outstandingBalance: bill.outstandingBalance,
                outstandingBalanceAdjusted: bill.outstandingBalanceAdjusted,
                loan: loanEntity,
                createdAt: bill.createdAt,
                updatedAt: bill.updatedAt,
              }),
          )
        : null,
      createdAt: loan.createdAt,
      updatedAt: loan.updatedAt,
      deletedAt: loan.deletedAt,
    });

    return loanEntity;
  }
}
