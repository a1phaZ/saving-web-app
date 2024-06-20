import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class FakeApiService extends ApiService {
  public override get<T>(path: string, params: any) {
    return of({
      success: true,
      data: {
        path,
        params,
      },
    } as T);
  }

  public override post<T>(path: string, data: object): Observable<T> {
    return of({
      success: true,
      data: {
        path,
        data,
      },
    } as T);
  }
}
