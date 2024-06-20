import { TextFormControl } from '../text-form-control/text.form-control.class';
import { EFieldTypes } from '../../../../../types';

export class PasswordFormControl extends TextFormControl {
  override type = EFieldTypes.PASSWORD;

  constructor(data: any = {}) {
    super(data);
  }
}
