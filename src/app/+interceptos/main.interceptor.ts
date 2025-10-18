import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AlertService } from '../+components/alert-system/service/alert.service';
import { catchError, finalize, map, tap, throwError } from 'rxjs';
import { LoadingService } from '../+components/loading/service/loading.service';
import { environment } from '../../environments/environment';

export const mainInterceptor: HttpInterceptorFn = (req, next) => {
  let currentRequest = req;
  let alertService = inject(AlertService);
  let loadingService = inject(LoadingService);

  const token: string | null = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token') : localStorage.getItem('token');

  const loadingServiceApis = [
    `${environment.ServerAddress}api/v1/auth/valid-token`,
    `${environment.ServerAddress}api/v1/address/delete`,
    `${environment.ServerAddress}api/v1/auth/member/get-info`
  ];

  if (token != null) {
    currentRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(currentRequest).pipe(
    tap(() => {
      if (loadingServiceApis.some(url => currentRequest.url.startsWith(url))) {
        loadingService.show();
      }
    }),
    finalize(() => {
      if (loadingServiceApis.some(url => currentRequest.url.startsWith(url))) {
        loadingService.hide();
      }
    })
  );
};
