import { Component, inject } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TelegramService } from '../../services/telegram.service';

@Component({
  selector: 'tg-fin-app-history',
  standalone: true,
  imports: [],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent {

  private _userService = inject(UserService);
  private _telegram = inject(TelegramService);

  public sendData(): void {
    this._telegram.sendData(this._userService.serializedUser);
  }

}
