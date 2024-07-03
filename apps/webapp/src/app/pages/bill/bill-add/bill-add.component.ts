import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTgPage } from '../../base/base-tg-page/base-tg-page';
import { TranslocoService } from '@ngneat/transloco';
import { BillAddForm } from '../../../models/forms/bill-add.form';
import { ReactiveFormsModule } from '@angular/forms';
import {
  EFormStatus,
  SelectFieldComponent,
  TextFormFieldMobileComponent,
} from '@tg-web-app/ui';
import { Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';
import { BillAdd } from '../../../store/bill/bill.actions';
import { Store } from '@ngxs/store';
import { PERIOD_LIST_ITEMS } from '../../../config/periods.config';

@Component({
  selector: 'webapp-bill-add',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextFormFieldMobileComponent,
    SelectFieldComponent,
  ],
  templateUrl: './bill-add.component.html',
  styleUrl: './bill-add.component.scss',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BillAddComponent extends BaseTgPage implements OnInit, OnDestroy {
  private _i18n = inject(TranslocoService);
  private _destroy$ = new Subject<void>();
  private _zone = inject(NgZone);
  private _router = inject(Router);
  private _cdr = inject(ChangeDetectorRef);
  private _store = inject(Store);

  private periods = inject(PERIOD_LIST_ITEMS);

  public MainButtonText!: string;
  public billAddForm!: BillAddForm;

  ngOnInit() {
    this._i18n.selectTranslate('button.save').subscribe((translate) => {
      this.MainButtonText = translate;

      this.initPage();
      this.initForm();
      this._cdr.detectChanges();
    });
  }

  BackButtonFn(): void {
    this._zone.run(() => {
      (async () => {
        await this._router.navigate(['/', 'bill']);
      })();
    });
  }

  MainButtonFn(): void {
    this.submitForm();
  }

  private initForm() {
    this.billAddForm = new BillAddForm(this.periods);

    this.billAddForm.statusChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((status) => {
        if (this._tg) {
          this._toggleMainButton(status);
        }
      });
  }

  private _toggleMainButton(status: string) {
    if (status === EFormStatus.VALID) {
      this._tg.showMainButton();
      return;
    }
    if (status === EFormStatus.INVALID) {
      this._tg.hideMainButton();
      return;
    }
  }

  protected submitForm() {
    this._store.dispatch(new BillAdd(this.billAddForm.value));
  }
}
