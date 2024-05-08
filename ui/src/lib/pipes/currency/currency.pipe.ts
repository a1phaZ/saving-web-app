import {
  formatNumber,
  getCurrencySymbol,
  getLocaleNumberFormat,
  getLocaleNumberSymbol,
  NumberFormatStyle,
  NumberSymbol,
} from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

export enum ECurrency {
  'RUB' = 'ru-RU',
  'USD' = 'en-US',
}

@Pipe({
  name: 'tgFinAppCurrency',
  standalone: true,
})
export class TgFinAppCurrencyPipe implements PipeTransform {
  transform(value: number, ...args: Array<'RUB' | 'USD'>): any {
    const currencyCode = args[0] || 'RUB';

    const subzero = value < 0;
    const _number = Math.floor(Math.abs(value)) * (subzero ? -1 : 1);
    const _decimal = (value % 1).toFixed(2).substring(2);
    const divider = getLocaleNumberSymbol(
      ECurrency[currencyCode],
      NumberSymbol.CurrencyDecimal
    );
    const numberFormat = getLocaleNumberFormat(
      ECurrency[currencyCode],
      NumberFormatStyle.Currency
    );
    const symbol = getCurrencySymbol(currencyCode, 'narrow');
    const currencyPosition = numberFormat.indexOf('¤');
    const preparedNumber = this._prepareNumber(
      _number,
      ECurrency[currencyCode]
    );
    return {
      number: preparedNumber,
      divider,
      decimal: _decimal,
      currencySymbol: symbol,
      currencyPosition,
    };
  }

  private _prepareNumber(n: number, locale: string): string {
    return formatNumber(n, locale);
  }
}
