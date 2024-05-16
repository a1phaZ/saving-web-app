import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAppState } from '../store/app/app.state';
import { EIconName } from '@tg-web-app/ui';
import { EActionPathByNameResolver } from '../models/actions/action.names';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  // constructor() {}

  AppInit(): Observable<IAppState> {
    return of({
      home: {
        actionButtons: [
          {
            id: 1,
            icon: EIconName.saxArrangeCircle2Outline,
            size: '28px',
            title: 'Между своими',
            action: {
              path: EActionPathByNameResolver.ADD_TRANSACTION,
            },
          },
          {
            id: 2,
            icon: EIconName.saxMoneyReciveOutline,
            size: '28px',
            title: 'Доход',
            action: {
              path: EActionPathByNameResolver.ADD_TRANSACTION_INCOME,
            },
          },
          {
            id: 3,
            icon: EIconName.saxMoneySendOutline,
            size: '28px',
            title: 'Расход',
            action: {
              path: EActionPathByNameResolver.ADD_TRANSACTION_EXPENSE,
            },
          },
          {
            id: 4,
            icon: EIconName.saxPresentionChartOutline,
            size: '28px',
            title: 'Статистика',
            action: {
              path: EActionPathByNameResolver.STATISTICS,
            },
            disabled: true,
          },
        ],
        listActions: [
          // {
          //   id: 3,
          //   title: 'Создать объявление',
          //   type: 'action',
          //   icon: {
          //     name: EIconName.saxWallet1Outline,
          //     size: '32px',
          //   },
          // },
        ],
      },
    });
  }
}
