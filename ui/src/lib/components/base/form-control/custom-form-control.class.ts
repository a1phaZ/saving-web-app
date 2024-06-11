import { FormControl } from '@angular/forms';

export class CustomFormControlClass extends FormControl {
  Label!: string;

  constructor(
    data: { value?: any; validatorOrOpts?: any; options?: any } = {}
  ) {
    super(data.value, data.validatorOrOpts);
    console.log(data.options);

    this.Label = data?.options?.label;
  }
}
