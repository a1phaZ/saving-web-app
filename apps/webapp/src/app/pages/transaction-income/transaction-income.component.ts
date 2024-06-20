import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionAddComponent } from '../transaction-add/transaction-add.component';
import {
  BalanceComponent,
  InputBotFieldComponent,
  PageContainerComponent,
  SelectFieldComponent,
} from '@tg-web-app/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransactionAdd } from '../../store/transaction/transaction.action';
import {
  ETransactionCashFlow,
  ETransactionType,
  ITransaction,
} from '@tg-web-app/entity';

@Component({
  selector: 'webapp-transaction-income',
  standalone: true,
  imports: [
    CommonModule,
    BalanceComponent,
    FormsModule,
    InputBotFieldComponent,
    PageContainerComponent,
    SelectFieldComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './transaction-income.component.html',
  styleUrl: './transaction-income.component.scss',
})
export class TransactionIncomeComponent extends TransactionAddComponent {
  override MainButtonText = 'Добавить доход';

  override ngOnInit() {
    super.ngOnInit();
  }

  override MainButtonFn() {
    const dataToSave: Partial<ITransaction> = {
      Type: ETransactionType.INCOME,
      Cashflow: ETransactionCashFlow.INCOME,
      Amount: Number(this.form.value.amount),
      Target: this.form.value.target,
      Description: this.form.value.description,
      Timestamp: +Date.now(),
    };

    this.store.dispatch(new TransactionAdd(dataToSave));
    this.formReset();
  }
}
