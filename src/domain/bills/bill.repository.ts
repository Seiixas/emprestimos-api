import { BillsModel } from './bill.entity';

export abstract class BillsRepository {
  abstract bulkSave(bill: BillsModel[]): Promise<void>;
}
