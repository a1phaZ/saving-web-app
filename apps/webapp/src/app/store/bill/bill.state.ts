import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { Bill } from '@tg-web-app/entity';
import { Injectable, inject } from '@angular/core';
import {
  BillAdd,
  BillAddFail,
  BillAddSuccess,
  BillGet,
  BillGetFail,
  BillGetSuccess,
} from './bill.actions';
import { catchError, EMPTY, tap } from 'rxjs';
import { BillService } from '../../services/bill.service';
import { TListItem } from '@tg-web-app/ui';

export const BILL_STATE_TOKEN = new StateToken<Bill[]>('bill');

export const initialState: Bill[] = [];

@Injectable()
@State({
  name: BILL_STATE_TOKEN,
  defaults: initialState,
})
export class BillState {
  private _billService = inject(BillService);

  @Selector()
  static BillsList(state: Bill[]): TListItem[] {
    return [...state.map((item) => item.ListItem)];
  }

  @Action(BillGet)
  getAll(ctx: StateContext<Bill[]>, action: BillGet) {
    return this._billService.getBills().pipe(
      tap((bills) => {
        ctx.dispatch(new BillGetSuccess(bills));
      }),
      catchError((err) => {
        ctx.dispatch(new BillGetFail(err));
        return EMPTY;
      })
    );
  }

  @Action(BillGetSuccess)
  getSuccess(ctx: StateContext<Bill[]>, action: BillGetSuccess) {
    if (action.payload.length === 0) {
      return;
    }
    return ctx.setState(action.payload);
  }

  @Action(BillGetFail)
  getFail(ctx: StateContext<Bill[]>, action: BillGetFail) {
    return ctx.setState(initialState);
  }

  @Action(BillAdd)
  addBill(ctx: StateContext<Bill[]>, action: BillAdd) {
    return this._billService.addBill(action.payload).pipe(
      tap((bill) => {
        ctx.dispatch(new BillAddSuccess(bill));
      }),
      catchError((err) => {
        ctx.dispatch(new BillAddFail(err));
        return EMPTY;
      })
    );
  }

  @Action(BillAddSuccess)
  addBillSuccess(ctx: StateContext<Bill[]>, action: BillAddSuccess) {
    return ctx.setState([...ctx.getState(), action.payload]);
  }

  @Action(BillAddFail)
  addBillFail(ctx: StateContext<Bill[]>, action: BillAddFail) {
    console.log(action.error);
    // return ctx.patchState(initialState);
  }
}
