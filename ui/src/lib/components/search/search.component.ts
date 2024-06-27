import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextFormFieldComponent } from '../form';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SearchForm } from './search.form';
import { Subject } from 'rxjs';
import { TextFormFieldMobileComponent } from '../text-form-field-mobile/text-form-field-mobile.component';
export interface ISearchForm {
  search: string;
}

@Component({
  selector: 'ui-search',
  standalone: true,
  imports: [
    CommonModule,
    TextFormFieldMobileComponent,
    ReactiveFormsModule,
    TextFormFieldMobileComponent,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnDestroy {
  @Output()
  public onSearchChange = new EventEmitter<string>();

  private _destroy$ = new Subject<void>();

  public form: SearchForm<ISearchForm> = this.initForm();

  private initForm(): SearchForm<ISearchForm> {
    const form = new SearchForm();

    form.valueChanges.subscribe((value: ISearchForm) => {
      this.onSearchChange.emit(value.search);
    });

    return form;
  }

  public ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
