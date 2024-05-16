import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Transaction } from '@tg-web-app/entity';
import { inject, Injectable } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import {
  TransactionAdd,
  TransactionAddFail,
  TransactionAddSuccess,
  TransactionGet,
  TransactionGetByWallet,
  TransactionGetByWalletFail,
  TransactionGetByWalletSuccess,
  TransactionGetFail,
  TransactionGetSuccess,
} from './transaction.action';
import { catchError, tap } from 'rxjs';

export const TRANSACTION_STATE_TOKEN = new StateToken<Transaction[]>(
  'transaction'
);

export const initialState: Transaction[] = [];

@State({
  name: TRANSACTION_STATE_TOKEN,
  defaults: initialState,
})
@Injectable()
export class TransactionState {
  private _transactionService = inject(TransactionService);

  @Action(TransactionGet)
  transactionGet(ctx: StateContext<Transaction[]>, action: TransactionGet) {
    const state = ctx.getState();
    if (state.length) {
      return;
    }
    return this._transactionService.getAllTransactions().pipe(
      tap((data) => {
        return ctx.dispatch(new TransactionGetSuccess(data));
      }),
      catchError((err) => {
        return ctx.dispatch(new TransactionGetFail(err));
      })
    );
  }

  @Action(TransactionGetSuccess)
  transactionGetSuccess(
    ctx: StateContext<Transaction[]>,
    action: TransactionGetSuccess
  ) {
    return ctx.setState(action.list);
  }

  @Action(TransactionGetFail)
  transactionGetFail(
    ctx: StateContext<Transaction[]>,
    action: TransactionGetFail
  ) {
    console.log(action.error);
  }

  @Action(TransactionGetByWallet)
  transactionGetByWallet(
    ctx: StateContext<Transaction[]>,
    action: TransactionGetByWallet
  ) {
    return this._transactionService.getTransactions(action.walletId).pipe(
      tap((data) => {
        return ctx.dispatch(new TransactionGetByWalletSuccess(data));
      }),
      catchError((err) => {
        return ctx.dispatch(new TransactionGetByWalletFail(err));
      })
    );
  }

  @Action(TransactionGetByWalletSuccess)
  transactionGetByWalletSuccess(
    ctx: StateContext<Transaction[]>,
    action: TransactionGetByWalletSuccess
  ) {
    const state = ctx.getState();
    action.list.forEach((t) => {
      const idx = state.findIndex((x) => x.Id === t.Id);
      if (idx > -1) {
        state[idx] = t;
      }
    });
    return ctx.setState(state);
  }

  @Action(TransactionGetByWalletFail)
  transactionGetByWalletFail(
    ctx: StateContext<Transaction[]>,
    action: TransactionGetByWalletFail
  ) {
    console.log(action.error);
  }

  @Action(TransactionAdd)
  transactionAdd(ctx: StateContext<Transaction[]>, action: TransactionAdd) {
    return this._transactionService.addTransaction(action.payload).pipe(
      tap((data) => {
        return ctx.dispatch(new TransactionAddSuccess(data));
      }),
      catchError((err) => {
        return ctx.dispatch(new TransactionAddFail(err));
      })
    );
  }

  @Action(TransactionAddSuccess)
  transactionAddSuccess(
    ctx: StateContext<Transaction[]>,
    action: TransactionAddSuccess
  ) {
    const state = ctx.getState();
    return ctx.setState([...state, action.payload]);
  }

  @Action(TransactionAddFail)
  transactionAddFail(
    ctx: StateContext<Transaction[]>,
    action: TransactionAddFail
  ) {
    console.log(action.error);
  }

  @Selector()
  static TransactionList(state: Transaction[]) {
    return state.sort((a, b) => b.Timestamp - a.Timestamp);
  }

  @Selector()
  static TransactionListByWallet(state: Transaction[]) {
    return (walletId: string) =>
      state
        .filter(
          (t) =>
            (t.Source === walletId && t.Cashflow < 0) ||
            (t.Target === walletId && t.Cashflow > 0)
        )
        .sort((a, b) => b.Timestamp - a.Timestamp)
        .map((item) => {
          return item.ListItem;
        });
  }
}
