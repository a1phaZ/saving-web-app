import { inject, Injectable } from '@angular/core';
import { IWallet, Wallet } from '@tg-web-app/entity';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  private _apiService: ApiService = inject(ApiService);

  constructor() {}

  public getTotal(): Observable<number> {
    return this._apiService
      .get<{ total: number }>('/wallet/total', {})
      .pipe(map((result) => result.total));
  }

  public getTotalActive(): Observable<number> {
    return this._apiService
      .get<{ total: number }>('/wallet/total/active', {})
      .pipe(map((result) => result.total));
  }

  public getTotalInactive(): Observable<number> {
    return this._apiService
      .get<{ total: number }>('/wallet/total/inactive', {})
      .pipe(map((result) => result.total));
  }

  public getWallets() {
    return this._apiService
      .get<Array<IWallet & { _id: string }>>('/wallet', {})
      .pipe(
        map((result) => {
          return result.map(this.responseToWallet);
        })
      );
  }

  public addWallet(data: Partial<IWallet>): Observable<Wallet> {
    return this._apiService
      .post<IWallet & { _id: string }>('/wallet/add', data)
      .pipe(map(this.responseToWallet));
  }

  private responseToWallet(data: IWallet & { _id: string }): Wallet {
    return new Wallet({
      Id: data._id,
      Title: data.Title || '',
      Active: data.Active,
      Description: data.Description || '',
      Balance: data.Balance || 0,
      Owner: data.Owner,
    });
  }
}
