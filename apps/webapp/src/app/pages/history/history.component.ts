import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TelegramService } from '../../services/telegram.service';
import {
  BalanceComponent,
  ContentBlockComponent,
  ListItemComponent,
  PageContainerComponent,
  ActionButtonComponent,
  HorizontalContainerComponent,
  TActionButton,
  EIconName,
  TListItem,
  BlockHeaderComponent,
} from '@tg-web-app/ui';
import { CommonModule } from '@angular/common';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AppState } from '../../store/app/app.state';
import { TListAction } from 'ui/src/lib/types/list-action.type';
import { DynamicComponentDirective } from '../../directives/dynamic-component/dynamic-component.directive';

@Component({
  selector: 'webapp-history',
  standalone: true,
  imports: [
    ListItemComponent,
    ContentBlockComponent,
    PageContainerComponent,
    BalanceComponent,
    ActionButtonComponent,
    HorizontalContainerComponent,
    BlockHeaderComponent,
    DynamicComponentDirective,
    CommonModule,
  ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
})
export class HistoryComponent {
  private _userService = inject(UserService);
  private _telegram = inject(TelegramService);

  public component = BalanceComponent;

  @Select(AppState.ActionButtons) actionButtons$!: Observable<TActionButton[]>;
  @Select(AppState.ListActions) listActions$!: Observable<TListAction[]>;

  public items: TListItem[] = [
    {
      id: '123',
      title: 'Toncoin',
      type: 'wallet',
      icon: {
        name: EIconName.saxWallet1Outline,
        size: '32px',
      },
      subtitle: '0 TON',
      additional: 0,
    },
    {
      id: '12345',
      title: 'Мои объявления',
      subtitle: 'Настройка объявлений и платежей',
      icon: {
        name: EIconName.saxWallet1Outline,
        size: '32px',
      },
      type: 'item',
    },
  ];

  public sendData(): void {
    this._telegram.sendData(this._userService.serializedUser);
  }

  public test(): void {
    // this._telegram.showPopup({ message: 'asdfasdf' });
    // this._telegram.showAlert('showAlert');
    // this._telegram.showConfirm('showConfirm');
  }

  public itemClick(item: TListItem): void {
    console.log(item);
  }
}
