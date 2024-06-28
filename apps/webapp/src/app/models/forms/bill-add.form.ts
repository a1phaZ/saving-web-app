import {
  BaseForm,
  EFieldTypes,
  EIconName,
  SelectFormControl,
  TextFormControl,
  TListItem,
} from '@tg-web-app/ui';
import { FormControl } from '@angular/forms';

export class BillAddForm extends BaseForm {
  constructor() {
    super();
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
        value: '3',
        options: {
          label: 'bill.add.form.period.label',
          name: 'bill.add.form.period.name',
          placeholder: 'bill.add.form.period.placeholder',
          values: [
            {
              id: '3',
              type: 'wallet',
              title: 'bill.add.form.period.values.3',
              icon: {
                name: EIconName.saxBillOutline,
                size: '24px',
              },
            },
            {
              id: '6',
              type: 'wallet',
              title: 'bill.add.form.period.values.6',
              icon: {
                name: EIconName.saxBillOutline,
                size: '24px',
              },
            },
            {
              id: '12',
              type: 'wallet',
              title: 'bill.add.form.period.values.12',
              icon: {
                name: EIconName.saxBillOutline,
                size: '24px',
              },
            },
          ],
        },
      }),
      PaidDate: new TextFormControl({
        options: {
          placeholder: 'bill.add.form.paid-date.placeholder',
          label: 'bill.add.form.paid-date.label',
          type: EFieldTypes.NUMBER,
        },
      }),
    };
  }
}
