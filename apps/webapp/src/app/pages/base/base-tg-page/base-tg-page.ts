import { Directive, OnDestroy, OnInit, inject } from '@angular/core';
import { TelegramService } from '../../../services/telegram.service';

@Directive()
export abstract class BaseTgPage implements OnDestroy {
  protected _tg = inject(TelegramService);

  private _mainButtonHandler!: () => void;
  private _backButtonHandler!: () => void;
  abstract MainButtonText: string;
  abstract MainButtonFn(): void;
  abstract BackButtonFn(): void;

  // public ngOnInit(): void {
  //   this.initPage();
  // }

  protected initPage(): void {
    this._backButtonHandler = this.BackButtonFn.bind(this);
    this._tg.BackButton.show();
    this._tg.BackButton.onClick(this._backButtonHandler);

    this._mainButtonHandler = this.MainButtonFn.bind(this);
    this._tg.MainButton.onClick(this._mainButtonHandler);
    this._tg.MainButton.setText(this.MainButtonText);
  }

  ngOnDestroy(): void {
    this._tg.MainButton.offClick(this._mainButtonHandler);
    this._tg.BackButton.offClick(this._backButtonHandler);
    this._tg.hideBackButton();
    this._tg.hideMainButton();
  }
}
