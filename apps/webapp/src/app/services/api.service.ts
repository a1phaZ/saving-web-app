import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, InjectionToken, inject } from '@angular/core';
import { catchError, of } from 'rxjs';
import { TelegramService } from './telegram.service';

export const BASE_URL = new InjectionToken<string>('Base Server Url', {
  factory: () => 'http://localhost:3000/api',
});

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private _http = inject(HttpClient);
  private _baseUrl = inject(BASE_URL);
  private _telegram = inject(TelegramService);

  public post(path: string, data: object) {
    const _headers: HttpHeaders = new HttpHeaders({
      'x-init-data': this._telegram.SafeInitData,
    });
    return this._http
      .post(this._baseUrl + path, data, {
        headers: _headers,
      })
      .pipe(
        catchError((err) => {
          console.log(err);
          return of(err);
        })
      );
  }
}
