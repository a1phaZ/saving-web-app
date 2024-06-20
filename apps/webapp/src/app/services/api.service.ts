import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import { TelegramService } from './telegram.service';
import { of } from 'rxjs';

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

  public get<T>(path: string, params: any) {
    const _headers: HttpHeaders = new HttpHeaders({
      'x-init-data': this._telegram.SafeInitData,
    });
    console.log(params);
    return this._http.get<T>(this._baseUrl + path, {
      headers: _headers,
    });
  }

  public post<T>(path: string, data: object) {
    const _headers: HttpHeaders = new HttpHeaders({
      'x-init-data': this._telegram.SafeInitData,
    });
    return this._http.post<T>(this._baseUrl + path, data, {
      headers: _headers,
    });
    // .pipe(
    //   catchError((err) => {
    //     console.log(err);
    //     return of(EMPTY);
    //   })
    // );
  }
}
