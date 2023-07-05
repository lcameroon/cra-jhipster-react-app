export interface ILabel {
  id?: number;
  label?: string;
  operations?: any[] | null;
}

export const defaultValue: Readonly<ILabel> = {};
