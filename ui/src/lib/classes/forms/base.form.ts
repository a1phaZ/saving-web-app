import { FormControl, FormGroup } from '@angular/forms';

export abstract class BaseForm extends FormGroup {
  protected constructor() {
    super({});

    this._initForm();
  }

  private _initForm() {
    const controls = this.initControls();
    this._setControls(controls);
  }

  private _setControls(controls: Record<string, FormControl>) {
    Object.keys(controls).forEach((key) => {
      this.addControl(key, controls[key]);
    });
  }

  protected abstract initControls(): Record<string, FormControl>;

  public setControlValue(key: string, value: any) {
    this.get(key)?.setValue(value);
  }
}
