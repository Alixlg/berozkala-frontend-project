import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestResultModel } from '../models/requestResult.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  httpService = inject(HttpClient);

  get<TResponse>(api: string, params?: HttpParams): Observable<RequestResultModel<TResponse>> {
    return this.httpService.get<RequestResultModel<TResponse>>(`${environment.ServerAddress}${api}`, { params });
  }

  post<TResponse, THttpBody>(api: string, body: THttpBody, params?: HttpParams): Observable<RequestResultModel<TResponse>> {
    return this.httpService.post<RequestResultModel<TResponse>>(`${environment.ServerAddress}${api}`, body, { params });
  }

  put<TResponse, THttpBody>(api: string, body: THttpBody, params?: HttpParams): Observable<RequestResultModel<TResponse>> {
    return this.httpService.put<RequestResultModel<TResponse>>(`${environment.ServerAddress}${api}`, body, { params });
  }

  del<TResponse, THttpBody>(api: string, body?: THttpBody, params?: HttpParams): Observable<RequestResultModel<TResponse>> {
    return this.httpService.delete<RequestResultModel<TResponse>>(`${environment.ServerAddress}${api}`, { body, params });
  }
}
