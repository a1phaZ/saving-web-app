import { inject, Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { WalletService } from '../../services/wallet.service';
import {
  WalletAdd,
  WalletAddFail,
  WalletAddSuccess,
  WalletGet,
  WalletGetFail,
  WalletGetSuccess,
} from './wallet.action';
import { catchError, EMPTY, tap } from 'rxjs';
import { EIconName, TListItem } from '@tg-web-app/ui';
import { EActionPathByNameResolver } from '../../models/actions/action.names';
import { Wallet } from '@tg-web-app/entity';

export const WALLET_STATE_TOKEN = new StateToken<Wallet[]>('wallet');

export const initialState: Wallet[] = [];

@Injectable()
@State({
  name: WALLET_STATE_TOKEN,
  defaults: initialState,
})
export class WalletState {
  private _walletService = inject(WalletService);

  @Selector()
  static WalletsList(state: Wallet[]): TListItem[] {
    return [
      {
        id: 'add.wallet',
        title: 'Добавить кошелек',
        icon: {
          name: EIconName.saxAddCircleOutline,
          size: '32px',
        },
        type: 'action',
        path: EActionPathByNameResolver.ADD_WALLET,
      },
      ...state.map((item) => item.ListItem),
    ];
  }

  @Selector()
  static WalletsListExcludeOne(state: Wallet[]): (id: string) => TListItem[] {
    return (id: string) => {
      return state.filter(({ Id }) => id !== Id).map((item) => item.ListItem);
    };
  }

  @Selector()
  static ListItemByWalletId(state: Wallet[]): (id: string) => TListItem | null {
    return (id: string) => {
      return state.find(({ Id }) => id === Id)?.ListItem || null;
    };
  }

  @Selector()
  static WalletInfo(state: Wallet[]) {
    return (id: string) => {
      return state.find(({ Id }) => id === Id);
    };
  }

  @Action(WalletGet)
  getAll(ctx: StateContext<TListItem[]>) {
    return this._walletService.getWallets().pipe(
      tap((data) => {
        ctx.dispatch(new WalletGetSuccess(data));
      }),
      catchError((err) => {
        ctx.dispatch(new WalletGetFail(err));
        return EMPTY;
      })
    );
  }

  @Action(WalletGetSuccess)
  getAllSuccess(ctx: StateContext<Wallet[]>, action: WalletGetSuccess) {
    ctx.setState(action.list);
  }

  @Action(WalletGetFail)
  getAllFail(ctx: StateContext<Wallet[]>, action: WalletGetFail) {
    console.log(action.error);
    ctx.patchState(initialState);
  }

  @Action(WalletAdd)
  addWallet(ctx: StateContext<Wallet[]>, action: WalletAdd) {
    return this._walletService.addWallet(action.payload).pipe(
      tap((data) => {
        console.log(data);
        ctx.dispatch(new WalletAddSuccess(data));
      }),
      catchError((error) => ctx.dispatch(new WalletAddFail(error)))
    );
  }

  @Action(WalletAddSuccess)
  addWalletSuccess(ctx: StateContext<Wallet[]>, action: WalletAddSuccess) {
    const state = ctx.getState();
    ctx.setState([...state, action.payload]);
  }

  @Action(WalletAddFail)
  addWalletFail(ctx: StateContext<Wallet[]>, action: WalletAddFail) {
    console.log(action.error);
  }
}
