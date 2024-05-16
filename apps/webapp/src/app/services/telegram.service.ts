import { Injectable } from '@angular/core';
import WebApp from '@twa-dev/sdk';
import {
  MainButton,
  BackButton,
  PopupParams,
  EventNames,
} from '@twa-dev/types';

@Injectable({
  providedIn: 'root',
})
export class TelegramService {
  private _tg = WebApp;

  // constructor() {
  //   console.log(this.SafeInitData);
  //   console.log(this.UserData);
  // }

  get MainButton(): MainButton {
    return this._tg.MainButton;
  }

  public showMainButton(): void {
    this._tg.MainButton.show();
  }

  public hideMainButton(): void {
    this._tg.MainButton.hide();
  }

  public showBackButton(): void {
    this._tg.BackButton.show();
  }

  public hideBackButton(): void {
    this._tg.BackButton.hide();
  }

  get BackButton(): BackButton {
    return this._tg.BackButton;
  }

  setMainButtonOnClick(f: any) {
    console.log(f);
    const _f = () => f();
    this._tg.MainButton.onClick(_f);
  }

  setMainButtonOffClick(f: any) {
    const _f = () => f();
    this._tg.MainButton.onClick(_f);
  }

  get UserData() {
    return this._tg.initDataUnsafe.user;
  }

  get SafeInitData() {
    return this._tg.initData;
  }

  get ColorScheme(): 'dark' | 'light' {
    return this._tg.colorScheme;
  }

  public sendData(data: object): void {
    this._tg.sendData(JSON.stringify(data));
  }

  public setClosingConfirmation(data: boolean): void {
    data
      ? this._tg.enableClosingConfirmation()
      : this._tg.disableClosingConfirmation();
  }

  public showPopup(params: PopupParams) {
    return this._tg.showPopup(params);
  }

  public showAlert(message: string) {
    return this._tg.showAlert(message);
  }

  public showConfirm(message: string) {
    return this._tg.showConfirm(message);
  }

  public ready(): void {
    this._tg.ready();
  }

  public setOnEvent(event: EventNames, f: (params: any) => void) {
    this._tg.onEvent(event, f);
  }

  public setOffEvent(event: EventNames, f: (params: any) => void) {
    this._tg.offEvent(event, f);
  }
}
