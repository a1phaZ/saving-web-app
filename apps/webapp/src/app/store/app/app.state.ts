import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { TActionButton } from '@tg-web-app/ui';
import { AppService } from '../../services/app.service';
import { AppInit, AppInitFail, AppInitSuccess } from './app.actions';
import { EMPTY, catchError, tap } from 'rxjs';
import { TListAction } from 'ui/src/lib/types/list-action.type';

export const APP_STATE_TOKEN = new StateToken<IAppState>('app');

export interface IAppState {
  [key: string]: {
    actionButtons: TActionButton[];
    listActions: TListAction[];
  };
}

export const initialState: IAppState = {};

@State({
  name: APP_STATE_TOKEN,
  defaults: initialState,
})
@Injectable()
export class AppState {
  private _appService = inject(AppService);

  @Action(AppInit)
  init(ctx: StateContext<IAppState>) {
    return this._appService.AppInit().pipe(
      tap((params: IAppState) => {
        ctx.dispatch(new AppInitSuccess(params));
      }),
      catchError((err) => {
        ctx.dispatch(new AppInitFail(err));
        return EMPTY;
      })
    );
  }

  @Action(AppInitSuccess)
  initSuccess(ctx: StateContext<IAppState>, action: AppInitSuccess) {
    ctx.patchState(action.state);
  }

  @Action(AppInitFail)
  initFail(ctx: StateContext<IAppState>, action: AppInitFail) {
    console.log(action.error);
    ctx.patchState(initialState);
  }

  @Selector()
  static ActionButtons(state: IAppState) {
    return (key: string) => {
      return state[key || 'home']?.actionButtons || [];
    };
  }

  @Selector()
  static ListActions(state: IAppState) {
    return (key: string) => {
      return state[key || 'home']?.listActions || [];
    };
  }
}
