import { IUser } from './user.model';

export interface IBankAccount {
  id?: number;
  name?: string;
  balance?: number;
  user?: IUser | null;
  operations?: any[] | null;
}

export const defaultValue: Readonly<IBankAccount> = {};
