import {
  BaseForm,
  EFieldTypes,
  SelectFormControl,
  TextFormControl,
  TListItem,
} from '@tg-web-app/ui';
import { FormControl } from '@angular/forms';
import { EPeriods } from '../../config/periods.config';
import { CalendarFormControl } from '@tg-web-app/ui';

export class BillAddForm extends BaseForm {
  constructor(private readonly periods: TListItem[]) {
    super();
    this.initForm();
  }

  protected initControls(): Record<string, FormControl> {
    return {
      Title: new TextFormControl({
        value: '',
        options: {
          placeholder: 'bill.add.form.title.placeholder',
          label: 'bill.add.form.title.label',
          type: EFieldTypes.TEXT,
        },
      }),
      Sum: new TextFormControl({
        // TODO number form control
        options: {
          placeholder: 'bill.add.form.sum.placeholder',
          label: 'bill.add.form.sum.label',
          type: EFieldTypes.NUMBER,
        },
      }),
      Period: new SelectFormControl<TListItem>({
        value: EPeriods.MONTHLY,
        options: {
          label: 'bill.add.form.period.label',
          name: 'bill.add.form.period.name',
          placeholder: 'bill.add.form.period.placeholder',
          values: this.periods,
        },
      }),
      PaidDate: new CalendarFormControl({
        options: {
          label: 'bill.add.form.paid-date.label',
          type: EFieldTypes.CALENDAR,
        },
      }),
    };
  }
}
