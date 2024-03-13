import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TelegramService } from '../../services/telegram.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'tg-fin-app-feedback',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.css',
})
export class FeedbackComponent {

  
  private _userService = inject(UserService);
  private _telegram = inject(TelegramService);

  public sendData(): void {
    this._telegram.sendData(this._userService.serializedUser);
  }

}
