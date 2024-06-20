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
import {
  ETransactionCashFlow,
  ETransactionType,
  ITransaction,
} from '@tg-web-app/entity';
import { TransactionAdd } from '../../store/transaction/transaction.action';

@Component({
  selector: 'webapp-transaction-expense',
  standalone: true,
  imports: [
    CommonModule,
    BalanceComponent,
    FormsModule,
    InputBotFieldComponent,
    PageContainerComponent,
    ReactiveFormsModule,
    SelectFieldComponent,
  ],
  templateUrl: './transaction-expense.component.html',
  styleUrl: './transaction-expense.component.scss',
})
export class TransactionExpenseComponent extends TransactionAddComponent {
  override MainButtonText = 'Добавить расход';

  override ngOnInit() {
    super.ngOnInit();
  }

  override MainButtonFn() {
    const dataToSave: Partial<ITransaction> = {
      Type: ETransactionType.EXPENSE,
      Cashflow: ETransactionCashFlow.EXPENSE,
      Amount: Number(this.form.value.amount),
      Source: this.form.value.source,
      Description: this.form.value.description,
      Timestamp: +Date.now(),
    };

    this.store.dispatch(new TransactionAdd(dataToSave));
    this.formReset();
  }
}
