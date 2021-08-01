import { IBankAccount } from './bank-account.model';
import { ILabel } from './label.model';

export interface IOperation {
  id?: number;
  date?: string;
  description?: string | null;
  amount?: number;
  bankAccount?: IBankAccount | null;
  labels?: ILabel[] | null;
}

export const defaultValue: Readonly<IOperation> = {};
