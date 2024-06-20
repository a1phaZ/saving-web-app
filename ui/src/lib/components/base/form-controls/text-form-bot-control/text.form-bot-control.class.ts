import { FormControl } from '@angular/forms';
import { EFieldTypes, IFormFieldOptions } from '@tg-web-app/ui';

export type TTextFormControlType = 'text';

export interface TextFormControlOptions {
  label: string;
  placeholder: string;
  type: TTextFormControlType;
}

export class TextFormBotControl
  extends FormControl
  implements IFormFieldOptions
{
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
      this.type = data?.options?.type || EFieldTypes.TEXT;
    }
  }

  label!: string;
  placeholder!: string;
  suffix!: string;
  type!: EFieldTypes;
}
