import { IOperation } from './operation.model';

export interface ILabel {
  id?: number;
  label?: string;
  operations?: IOperation[] | null;
}

export const defaultValue: Readonly<ILabel> = {};
