import { Repository } from 'typeorm';

import { LoansRepository } from '!domain/loans/loan.repository';
import { LoanModel } from '!domain/loans/loan.entity';

class TypeORMLoansRepository implements LoansRepository {
  constructor(private readonly _repository: Repository<LoanModel>) {}

  async save(loan: LoanModel): Promise<void> {
    await this._repository.save(loan);
  }

  async findById(id: string): Promise<LoanModel | null> {
    const loan = await this._repository.findOne({
      where: { id },
      relations: ['bills'],
    });

    return loan;
  }

  async findAll(): Promise<LoanModel[]> {
    const loans = await this._repository.find({ relations: ['bills'] });

    return loans;
  }
}

export { TypeORMLoansRepository };
