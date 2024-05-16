import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcomeComponent } from './nx-welcome.component';
import { TelegramService } from './services/telegram.service';
import { TabbarComponent } from '@tg-web-app/ui';
import { UserService } from './services/user.service';
import { TranslocoService } from '@ngneat/transloco';
import { Store } from '@ngxs/store';
import { AppInit } from './store/app/app.actions';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule, TabbarComponent],
  selector: 'webapp-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'webapp';
  private _telegram = inject(TelegramService);
  private _userService = inject(UserService);
  private _translocoService = inject(TranslocoService);
  private _store = inject(Store);

  constructor() {
    this._store.dispatch(new AppInit());
    this._telegram.ready();

    // this._apiService.post('/validate', {}).subscribe(console.log);

    this._translocoService.setActiveLang(this._userService.LanguageCode);
  }
}
