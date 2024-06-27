import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent, SelectFormControl } from '../base';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListItemComponent } from '../list-item/list-item.component';
import {
  IFormFieldOptions,
  ISelectFormFieldOptions,
  TListItem,
} from '../../types';
import { ModalService } from '../../services';
import { SelectFieldValuesListComponent } from './select-field-values-list/select-field-values-list.component';
import { filter, Subject, takeUntil } from 'rxjs';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'ui-select-field',
  standalone: true,
  imports: [
    CommonModule,
    ListItemComponent,
    FormsModule,
    ReactiveFormsModule,
    SelectFieldValuesListComponent,
    TranslocoPipe,
  ],
  providers: [ModalService],
  templateUrl: './select-field.component.html',
  styleUrl: './select-field.component.scss',
})
export class SelectFieldComponent
  extends FormFieldComponent<ISelectFormFieldOptions<TListItem>>
  implements OnInit, OnDestroy
{
  item!: TListItem;
  @Input() exclude: string[] = [];

  private _modalService: ModalService = inject(ModalService);
  private _destroy$: Subject<void> = new Subject<void>();

  override ngOnInit(): void {
    super.ngOnInit();

    const control = this.controlDir.control as SelectFormControl;

    this.options = control?.options;

    // this.item = this.activeItem;
  }

  public itemClick($event: any): void {
    // console.log($event);
  }

  get activeItem(): TListItem {
    return (
      this.options.values?.find(
        (item) => item.id === this.controlDir.control?.value
      ) ||
      ({
        title: 'Выберите период',
      } as TListItem)
    );
  }

  openModal() {
    const modal =
      this._modalService.openComponent<SelectFieldValuesListComponent>(
        SelectFieldValuesListComponent,
        {
          title: 'test',
          data: this.options.values?.filter(
            (item) => !this.exclude.includes(item.id)
          ),
        }
      );

    modal
      .pipe(
        filter((data) => !!data),
        takeUntil(this._destroy$)
      )
      .subscribe((data) => {
        this.onChange(data);
        // this.item = this.activeItem;
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
