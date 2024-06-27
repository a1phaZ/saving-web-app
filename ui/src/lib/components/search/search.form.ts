import { FormControl } from '@angular/forms';
import { BaseForm } from '../../classes/forms/base.form';
import { TextFormControl } from '@tg-web-app/ui';

export class SearchForm<T> extends BaseForm {
  constructor() {
    super();
  }

  protected initControls(): Record<string, FormControl> {
    return {
      search: new TextFormControl({
        options: {
          placeholder: 'search.placeholder',
          label: 'search.label',
        },
      }),
    };
  }
}
