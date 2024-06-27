import { FormControl } from '@angular/forms';
import {
  EFieldTypes,
  IFormControlConstructorData,
  ISelectFormFieldOptions,
  TListItem,
} from '../../../../types';

export class SelectFormControl<T = TListItem>
  extends FormControl
  implements ISelectFormFieldOptions<T>
{
  type: EFieldTypes.SELECT = EFieldTypes.SELECT;
  label!: string;
  name!: string;
  placeholder!: string;
  values!: T[];

  constructor(
    data: IFormControlConstructorData<ISelectFormFieldOptions<T>> = {}
  ) {
    super(data.value, data.validatorOrOpts);
    if (data.options) {
      this.label = data?.options?.label || '';
      this.name = data?.options?.name || '';
      this.placeholder = data?.options?.placeholder || '';
      this.values = data?.options?.values || [];
    }
  }

  get options(): Partial<ISelectFormFieldOptions<T>> {
    return {
      type: this.type,
      label: this.label,
      name: this.name,
      placeholder: this.placeholder,
      values: this.values,
    };
  }
}
