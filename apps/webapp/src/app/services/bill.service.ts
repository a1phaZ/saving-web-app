import { Injectable, inject } from '@angular/core';
import { ApiService } from './api.service';
import { map, Observable } from 'rxjs';
import { Bill, IBill } from '@tg-web-app/entity';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  private _apiService = inject(ApiService);

  constructor() {}

  public getBills() {
    return this._apiService
      .get<Array<Bill & { _id: string }>>('/bill', {})
      .pipe(
        map((result: Array<Bill & { _id: string }>) => {
          return result
            .sort((a: Bill, b: Bill) => a.PayDay - b.PayDay)
            .map(this.responseToBill);
        })
      );
  }

  public addBill(data: Partial<IBill>): Observable<Bill> {
    return this._apiService
      .post<IBill & { _id: string }>('/bill/add', data)
      .pipe(map(this.responseToBill));
  }

  protected responseToBill(data: IBill & { _id: string }) {
    return new Bill({
      Id: data._id,
      Title: data.Title || '',
      Active: data.Active,
      Description: data.Description || '',
      Owner: data.Owner,
      PayDay: data.PayDay,
      Period: data.Period,
      Status: data.Status,
      StopDate: data.StopDate,
      Sum: data.Sum,
    });
  }
}
