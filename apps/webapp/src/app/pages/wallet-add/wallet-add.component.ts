import { Component, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {
  EFormStatus,
  InputBotFieldComponent,
  PageContainerComponent,
  PageHeaderComponent,
  SwitchFieldComponent,
} from '@tg-web-app/ui';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { Store } from '@ngxs/store';
import { WalletAdd } from '../../store/wallet/wallet.action';
import { IWallet } from '@tg-web-app/entity';
import { BaseTgPage } from '../base/base-tg-page/base-tg-page';

@Component({
  selector: 'webapp-wallet-add',
  standalone: true,
  imports: [
    CommonModule,
    PageContainerComponent,
    InputBotFieldComponent,
    SwitchFieldComponent,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderComponent,
  ],
  templateUrl: './wallet-add.component.html',
  styleUrl: './wallet-add.component.scss',
})
export class WalletAddComponent
  extends BaseTgPage
  implements OnInit, OnDestroy
{
  private _router = inject(Router);
  private _zone = inject(NgZone);
  private _store = inject(Store);

  private _destroy$: Subject<void> = new Subject<void>();

  override MainButtonText = 'Сохранить';
  public override appStoreName = 'wallet.add';

  public form!: FormGroup;

  override ngOnInit(): void {
    this._initForm();
    super.ngOnInit();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._destroy$.next();
    this._destroy$.complete();
  }

  override MainButtonFn() {
    console.log(this.form.value);
    const data: Partial<IWallet> = {
      Title: this.form.get('title')?.value,
      Active: !!this.form.get('active')?.value,
      Description: this.form.get('description')?.value,
      Balance: this.form.get('balance')?.value,
    };
    this._store.dispatch(new WalletAdd(data));

    this._zone.run(() => {
      this.form.reset({ title: '', description: '', balance: 0, active: true }); //TODO reset form values for custom fields
    });
  }

  override BackButtonFn() {
    this._zone.run(() => {
      this._router.navigate(['/']);
    });
  }

  private _initForm(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      balance: new FormControl(0),
      active: new FormControl(true),
    });

    this.form.get('balance')?.valueChanges.subscribe(console.log);

    this.form.statusChanges
      .pipe(takeUntil(this._destroy$))
      .subscribe((status) => this._toggleMainButton(status));
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

  // public submitForm(): void {
  //   console.log(this.form.value);
  //   const data: Partial<IWallet> = {
  //     Title: this.form.get('title')?.value,
  //     Active: !!this.form.get('active')?.value,
  //     Description: this.form.get('description')?.value,
  //     Balance: this.form.get('balance')?.value,
  //   };
  //   this._store.dispatch(new WalletAdd(data));
  //   this.form.reset();
  // }
  // protected readonly Validators = Validators;
}
