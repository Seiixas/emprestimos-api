import { BillsModel } from '!domain/bills/bill.entity';
import { BillsRepository } from '!domain/bills/bill.repository';

class InMemoryBillsRepository implements BillsRepository {
  private bills: BillsModel[] = [];

  async bulkSave(bill: BillsModel[]): Promise<void> {
    this.bills.push(...bill);
  }
}

export { InMemoryBillsRepository };
