import { FormControl } from '@angular/forms';
import { IFormFieldOptions } from '@tg-web-app/ui';

export type TTextFormControlType = 'text';

export interface TextFormControlOptions {
  label: string;
  placeholder: string;
  type: TTextFormControlType;
}

export class TextFormControl extends FormControl implements IFormFieldOptions {
  constructor(
    data: {
      value?: any;
      validatorOrOpts?: any;
      options?: Partial<IFormFieldOptions>;
    } = {}
  ) {
    super(data.value, data.validatorOrOpts);
    if (data.options) {
      this.label = data?.options?.label || '';
      this.placeholder = data?.options?.placeholder || '';
      this.type = data?.options?.type || 'text';
    }
  }

  label!: string;
  placeholder!: string;
  suffix!: string;
  type!: 'text' | 'number';
}
