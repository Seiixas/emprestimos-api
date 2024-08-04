import { LoansRepository } from '!domain/loans/loan.repository';
import { Repository } from 'typeorm';
import { LoanModel } from '../models/loan.model';
import { LoanMapper } from '../mappers/loan.mapper';
import { LoanEntity } from '!domain/loans/loan.entity';

class TypeORMLoansRepository implements LoansRepository {
  constructor(private readonly _repository: Repository<LoanModel>) {}

  async save(loan: LoanModel): Promise<void> {
    await this._repository.save(loan);
  }

  async findById(id: string): Promise<LoanEntity | null> {
    const loan = await this._repository.findOne({
      where: { id },
    });

    return LoanMapper.toLocal(loan) ?? null;
  }

  async findAll(): Promise<LoanEntity[]> {
    const loans = await this._repository.find();

    return loans.map((loan) => LoanMapper.toLocal(loan));
  }
}

export { TypeORMLoansRepository };
