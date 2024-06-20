import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordFormControl, TextFormControl } from '@tg-web-app/ui';

export class RegistrationForm extends FormGroup {
  constructor() {
    super({});

    this._initForm();
  }

  private _initForm() {
    const controls = this._initControls();
    this._setControls(controls);
  }

  private _setControls(controls: Record<string, FormControl>) {
    Object.keys(controls).forEach((key) => {
      this.addControl(key, controls[key]);
    });
  }

  private _initControls(): Record<string, FormControl> {
    return {
      fullname: new TextFormControl({
        validatorOrOpts: [Validators.required],
        options: {
          label: 'fullname',
          prefix: 'person_outline',
          placeholder: 'Ex: John Doe',
        },
      }),
      email: new TextFormControl({
        validatorOrOpts: [Validators.required],
        options: {
          label: 'email',
          prefix: 'mail_outline',
          placeholder: 'Ex: 0XJx7@example.com',
        },
      }),
      password: new PasswordFormControl({
        validatorOrOpts: [Validators.required],
        options: {
          label: 'password',
          prefix: 'lock_outline',
          placeholder: 'Enter you password',
        },
      }),
    };
  }
}
