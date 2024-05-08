import { Component, inject, Input, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../base';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemComponent } from '../list-item/list-item.component';
import { IFormFieldOptions, TListItem } from '../../types';
import { ModalService } from '../../services';
import { SelectFieldValuesListComponent } from './select-field-values-list/select-field-values-list.component';
import { filter, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'ui-select-field',
  standalone: true,
  imports: [
    CommonModule,
    ListItemComponent,
    FormsModule,
    ReactiveFormsModule,
    SelectFieldValuesListComponent,
  ],
  providers: [ModalService],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss',
})
export class SelectFieldComponent
  extends FormFieldComponent<IFormFieldOptions>
  implements OnDestroy
{
  @Input() item!: TListItem;
  @Input() items: TListItem[] = [];
  @Input() exclude: string[] = [];

  private _modalService: ModalService = inject(ModalService);
  private _destroy$: Subject<void> = new Subject<void>();

  public itemClick($event: any): void {
    console.log($event);
  }

  openModal() {
    const modal =
      this._modalService.openComponent<SelectFieldValuesListComponent>(
        SelectFieldValuesListComponent,
        {
          title: 'test',
          data: this.items.filter((item) => !this.exclude.includes(item.id)),
        }
      );

    modal
      .pipe(
        filter((data) => !!data),
        takeUntil(this._destroy$)
      )
      .subscribe((data) => {
        console.log(data);
        this.onChange(data);
      });
  }

  closeModal(): void {
    this._modalService.closeModal();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
