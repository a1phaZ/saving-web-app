import {
  EFieldTypes,
  ICalendarFormFieldOptions,
  IFormControlConstructorData,
} from '@tg-web-app/ui';
import { FormControl } from '@angular/forms';

export class CalendarFormControl extends FormControl {
  type: EFieldTypes.CALENDAR = EFieldTypes.CALENDAR;
  label!: string;

  constructor(
    data: IFormControlConstructorData<ICalendarFormFieldOptions> = {}
  ) {
    super(data.value, data.validatorOrOpts);
    console.log(data);

    if (data.options) {
      this.label = data.options.label || '';
    }
  }

  get options(): Partial<ICalendarFormFieldOptions> {
    return {
      type: this.type,
      label: this.label,
    };
  }
}
