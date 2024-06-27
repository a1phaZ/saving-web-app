import {
  Directive,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Self,
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Directive()
export class FormFieldComponent<T> implements OnInit, ControlValueAccessor {
  // @Input()
  options: Partial<T> = {};

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() blur: EventEmitter<void> = new EventEmitter<void>();

  disabled!: boolean;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChange: (value: unknown) => void = () => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouched: () => void = () => {};

  constructor(@Self() public controlDir: NgControl) {
    controlDir.valueAccessor = this as unknown as ControlValueAccessor;
  }

  ngOnInit(): void {
    const control = this.controlDir.control;
    const validators = control?.validator ? [control?.validator] : [];
    control?.setValidators(validators);
  }

  writeValue(value: any): void {
    if (this.controlDir.control && this.controlDir.control.value != value) {
      this.controlDir.control?.setValue(value, { emitEvent: true });
    }
  }

  registerOnChange(onChange: (value: any) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }
}
