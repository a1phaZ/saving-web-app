import { inject, Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { ITransaction, Transaction } from '@tg-web-app/entity';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  private _apiService: ApiService = inject(ApiService);

  constructor() {}

  public getAllTransactions() {
    return this._apiService
      .get<Array<ITransaction & { _id: string }>>('/transaction', {})
      .pipe(
        map((result) => {
          return result.map(this.responseToTransaction);
        })
      );
  }

  public getTransactions(walletId: string) {
    return this._apiService
      .get<Array<ITransaction & { _id: string }>>(
        `/transaction/${walletId}`,
        {}
      )
      .pipe(
        map((result) => {
          return result.map(this.responseToTransaction);
        })
      );
  }

  public addTransaction(data: Partial<ITransaction>): Observable<Transaction> {
    return this._apiService
      .post<ITransaction & { _id: string }>(`/transaction/add`, data)
      .pipe(map(this.responseToTransaction));
  }

  private responseToTransaction(
    data: ITransaction & { _id: string }
  ): Transaction {
    return new Transaction({
      Id: data._id,
      Type: data.Type,
      Cashflow: data.Cashflow,
      Source: data.Source,
      Target: data.Target,
      Amount: data.Amount,
      Owner: data.Owner,
      Description: data.Description,
      Timestamp: data.Timestamp,
    });
  }
}
