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

export enum EFieldTypes {
  TEXT = 'text',
  NUMBER = 'number',
  SWITCH = 'switch',
  PASSWORD = 'password',
}
