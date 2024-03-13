import { Injectable, inject } from '@angular/core';
import { TelegramService } from './telegram.service';
import { DEFAULT_LANG } from '../models/i18n/lang.token';
import { TgUser, ITgUser } from '@tg-web-app/entity';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _user!: TgUser;

  private _tg = inject(TelegramService);
  private _defaultLang = inject(DEFAULT_LANG);

  constructor() { 
    const userData = this._tg.UserData;
    this.User = {
      Id: userData?.id,
      FirstName: userData?.first_name,
      LastName: userData?.last_name,
      UserName: userData?.username,
      AllowsWriteToPm: userData?.allows_write_to_pm,
      LanguageCode: userData?.language_code,
    }
  }

  public set User(params: ITgUser){
    this._user = new TgUser(params);
  }

  public get User(): TgUser {
    return this._user;
  }

  public get serializedUser(): ITgUser {
    return this._user.fromModel() as ITgUser;
  }

  public get LanguageCode(): string {
    return this._user.LanguageCode || this._defaultLang
  }
  
}
