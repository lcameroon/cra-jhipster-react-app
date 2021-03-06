import { IUser } from './user.model';
import { IOperation } from './operation.model';

export interface IBankAccount {
  id?: number;
  name?: string;
  balance?: number;
  user?: IUser | null;
  operations?: IOperation[] | null;
}

export const defaultValue: Readonly<IBankAccount> = {};
