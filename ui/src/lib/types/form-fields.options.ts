export interface IFormFieldOptions {
  placeholder: string;
  label: string;
  suffix: string;
  type: EFieldTypes;
}

export interface ISwitchFieldOptions {
  label: string;
  buttons: string[];
}

export interface ITextFormFieldOptions extends IFormFieldOptions {
  type: EFieldTypes;
  prefix: string;
}

export interface ISelectFormFieldOptions<T> {
  type: EFieldTypes.SELECT;
  label: string;
  name: string;
  placeholder: string;
  values: T[];
}

export interface ICalendarFormFieldOptions extends IFormFieldOptions {
  type: EFieldTypes.CALENDAR;
}

export enum EFieldTypes {
  TEXT = 'text',
  NUMBER = 'number',
  SWITCH = 'switch',
  PASSWORD = 'password',
  SELECT = 'select',
  CALENDAR = 'calendar',
}

export interface IFormControlConstructorData<T = any> {
  value?: string | number | null;
  validatorOrOpts?: any;
  options?: Partial<T>;
}
