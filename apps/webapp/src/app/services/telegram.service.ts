import { Injectable } from '@angular/core';
import WebApp from '@twa-dev/sdk';
import { MainButton, BackButton } from '@twa-dev/types';

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  private _tg = WebApp;

  constructor() {
    // this._tg.;
  }

  get MainButton(): MainButton {
    return this._tg.MainButton;
  }

  get BackButton(): BackButton {
    return this._tg.BackButton;
  }

  get UserData() {
    return this._tg.initDataUnsafe.user;
  }

  get SafeInitData() {
    return this._tg.initData;
  }

  public sendData(data: object): void {
    this._tg.sendData(JSON.stringify(data));
  }

  public setClosingConfirmation(data: boolean): void {
    data ? this._tg.enableClosingConfirmation() : this._tg.disableClosingConfirmation();
  }

  public ready(): void {
    
    this._tg.ready();
  }

  
}
