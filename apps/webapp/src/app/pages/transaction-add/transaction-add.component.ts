import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BalanceComponent,
  EFormStatus,
  InputFieldComponent,
  PageContainerComponent,
  PageHeaderComponent,
  SelectFieldComponent,
  SwitchFieldComponent,
  TListItem,
} from '@tg-web-app/ui';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { BaseTgPage } from '../base/base-tg-page/base-tg-page';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { from, map, Subject, switchMap, takeUntil } from 'rxjs';
import { WalletState } from '../../store/wallet/wallet.state';
import { TransactionAdd } from '../../store/transaction/transaction.action';
import {
  ETransactionCashFlow,
  ETransactionType,
  ITransaction,
} from '@tg-web-app/entity';

@Component({
  selector: 'webapp-transaction-add',
  standalone: true,
  imports: [
    CommonModule,
    PageContainerComponent,
    InputFieldComponent,
    SwitchFieldComponent,
    FormsModule,
    ReactiveFormsModule,
    PageHeaderComponent,
    SelectFieldComponent,
    BalanceComponent,
  ],
  templateUrl: './transaction-add.component.html',
  styleUrl: './transaction-add.component.scss',
})
export class TransactionAddComponent
  extends BaseTgPage
  implements OnInit, OnDestroy
{
  override MainButtonText: string = 'Сохранить';
  public form!: FormGroup;
  public sourceItem: TListItem = {
    title: 'Выберите счет списания',
  } as TListItem;
  public sourceList: TListItem[] = [];
  public targetItem: TListItem = {
    title: 'Выберите счет зачисления',
  } as TListItem;
  public targetList: TListItem[] = [];
  public title: string = this._getTitle();
  public store = inject(Store);
  private _router = inject(Router);
  private _zone = inject(NgZone);
  private _route = inject(ActivatedRoute);
  private _destroy$: Subject<void> = new Subject<void>();
  private _amountMaxValidator!: ValidatorFn;
  public override appStoreName = 'transaction.add';

  override ngOnInit() {
    super.ngOnInit();
    this._initForm();

    this.store
      .select(WalletState.WalletsListExcludeOne)
      .pipe(
        map((fn) => fn(this.targetItem.id)),
        takeUntil(this._destroy$)
      )
      .subscribe((list) => (this.sourceList = list));

    this.store
      .select(WalletState.WalletsListExcludeOne)
      .pipe(
        map((fn) => fn(this.sourceItem.id)),
        takeUntil(this._destroy$)
      )
      .subscribe((list) => (this.targetList = list));
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();
    this._destroy$.next();
    this._destroy$.complete();
  }

  BackButtonFn(): void {
    this._zone.run(() => {
      this._router.navigate(['/']).then();
    });
  }

  MainButtonFn(): void {
    const formValue = {
      Amount: this.form.value.amount,
      Source: this.form.value.source,
      Target: this.form.value.target,
      Description: this.form.value.description,
      Timestamp: +Date.now(),
    };
    const incomeTransaction: Partial<ITransaction> = {
      Type: ETransactionType.TRANSFER,
      Cashflow: ETransactionCashFlow.INCOME,
      ...formValue,
    };
    const expenseTransaction: Partial<ITransaction> = {
      Type: ETransactionType.TRANSFER,
      Cashflow: ETransactionCashFlow.EXPENSE,
      ...formValue,
    };

    from([incomeTransaction, expenseTransaction])
      .pipe(
        switchMap((transaction) =>
          this.store.dispatch(new TransactionAdd(transaction))
        ),
        takeUntil(this._destroy$)
      )
      .subscribe(() => this.formReset());
  }

  public formReset(): void {
    this._zone.run(() => {
      this.sourceItem = {
        title: 'Выберите счет списания',
      } as TListItem;
      this.targetItem = {
        title: 'Выберите счет зачисления',
      } as TListItem;
      this.form.reset();
    });
  }

  private _initForm(): void {
    this.form = new FormGroup({
      source: new FormControl(),
      target: new FormControl(),
      amount: new FormControl(null, [
        Validators.required,
        Validators.min(0.01),
      ]),
      description: new FormControl(),
    });

    this.form
      .get('source')
      ?.valueChanges.pipe(
        switchMap(this._listItemByWalletId.bind(this)),
        takeUntil(this._destroy$)
      )
      .subscribe((item: TListItem | null) => {
        this.sourceItem =
          item || ({ title: 'Выберите счет списания' } as TListItem);
        this.title = this._getTitle();
        this._configureAmountValidators();
      });

    this.form
      .get('target')
      ?.valueChanges.pipe(
        switchMap(this._listItemByWalletId.bind(this)),
        takeUntil(this._destroy$)
      )
      .subscribe((item: TListItem | null) => {
        this.targetItem =
          item || ({ title: 'Выберите счет зачисления' } as TListItem);
        this.title = this._getTitle();
      });

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

  private _getTitle() {
    if (!this.sourceItem.id || !this.targetItem.id) {
      return 'Создание транзакции';
    }
    return `${this.sourceItem.title} -> ${this.targetItem.title}`;
  }

  private _listItemByWalletId(id: string) {
    return this.store
      .select(WalletState.ListItemByWalletId)
      .pipe(map((fn) => fn(id)));
  }

  private _configureAmountValidators() {
    const control = this.form.get('amount');
    if (this.sourceItem.additional) {
      if (control?.hasValidator(this._amountMaxValidator)) {
        this.form.get('amount')?.removeValidators(this._amountMaxValidator);
      }
      this._amountMaxValidator = Validators.max(
        Number(this.sourceItem.additional)
      );
      control?.addValidators([this._amountMaxValidator]);
    }
  }
}
