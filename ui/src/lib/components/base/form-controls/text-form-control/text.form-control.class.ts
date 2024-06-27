import { FormControl } from '@angular/forms';
import {
  EFieldTypes,
  IFormControlConstructorData,
  ITextFormFieldOptions,
} from '@tg-web-app/ui';

export class TextFormControl
  extends FormControl
  implements ITextFormFieldOptions
{
  type: EFieldTypes = EFieldTypes.TEXT;
  prefix!: string;
  placeholder!: string;
  label!: string;
  suffix!: string;

  constructor(data: IFormControlConstructorData<ITextFormFieldOptions> = {}) {
    super(data.value, data.validatorOrOpts);
    if (data.options) {
      this.type = data?.options?.type || EFieldTypes.TEXT;
      this.prefix = data?.options?.prefix || '';
      this.placeholder = data?.options?.placeholder || '';
      this.label = data?.options?.label || '';
      this.suffix = data?.options?.suffix || '';
    }
  }

  get options(): Partial<ITextFormFieldOptions> {
    return {
      type: this.type,
      prefix: this.prefix,
      placeholder: this.placeholder,
      label: this.label,
      suffix: this.suffix,
    };
  }
}
