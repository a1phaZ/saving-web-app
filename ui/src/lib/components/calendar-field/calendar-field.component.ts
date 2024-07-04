import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from '../base';
import { EIconName, ICalendarFormFieldOptions, TListItem } from '../../types';
import { ModalService } from '../../services';
import { filter, Subject, takeUntil } from 'rxjs';
import { CalendarFormControl } from '../base/form-controls/calendar-form-control/calendar.form-control.class';
import { CalendarComponent } from '../calendar/calendar.component';
import { ListItemComponent } from '../list-item/list-item.component';
import { TranslocoPipe, TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'ui-calendar-field',
  standalone: true,
  imports: [CommonModule, CalendarComponent, ListItemComponent, TranslocoPipe],
  providers: [ModalService],
  templateUrl: './calendar-field.component.html',
  styleUrl: './calendar-field.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarFieldComponent
  extends FormFieldComponent<ICalendarFormFieldOptions>
  implements OnInit, OnDestroy
{
  private _modalService: ModalService = inject(ModalService);
  private _cdr: ChangeDetectorRef = inject(ChangeDetectorRef);
  private _transloco: TranslocoService = inject(TranslocoService);
  private _destroy$: Subject<void> = new Subject<void>();

  override ngOnInit() {
    super.ngOnInit();

    const control = this.controlDir.control as CalendarFormControl;

    this.options = control?.options;

    this._cdr.detectChanges();
  }

  public get lang(): string {
    return this._transloco.getActiveLang();
  }

  public get displayValue(): TListItem {
    return {
      type: 'wallet',
      id: this.controlDir.control?.value,
      title: (this.controlDir.control?.value
        ? new Date(this.controlDir.control?.value)
        : new Date()
      ).toLocaleDateString(this.lang),
      icon: {
        name: EIconName.saxCalendar1Outline,
        size: '24px',
      },
    };
  }

  public openModal(): void {
    const modal = this._modalService.openComponent<CalendarComponent>(
      CalendarComponent,
      {
        title: 'calendar.title',
        data: {
          value: this.controlDir.control?.value,
        },
      }
    );

    modal
      .pipe(
        filter((data) => !!data),
        takeUntil(this._destroy$)
      )
      .subscribe((data) => {
        this.onChange(data);
        this._cdr.detectChanges();
      });
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
