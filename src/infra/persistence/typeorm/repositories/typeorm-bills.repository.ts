import { Repository } from 'typeorm';

import { BillsRepository } from '!domain/bills/bill.repository';
import { BillsModel } from '!domain/bills/bill.entity';

class TypeORMBillsRepository implements BillsRepository {
  constructor(private readonly _repository: Repository<BillsModel>) {}

  async bulkSave(bill: BillsModel[]): Promise<void> {
    await this._repository.save(bill);
  }
}

export { TypeORMBillsRepository };
