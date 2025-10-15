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
  const skipAlertApis = [
    `${environment.ServerAddress}api/v1/auth/valid-token`,
    `${environment.ServerAddress}api/v1/auth/member/get-info`
  ];

  const loadingServiceApis = [
    `${environment.ServerAddress}api/v1/auth/valid-token`,
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
      if (loadingServiceApis.includes(currentRequest.url)) {
        loadingService.show();
      }
    }),
    map((res: any) => {
      if (res.body && res.body.isSuccess == false && !skipAlertApis.includes(res.url)) {
        alertService.newAlert(res.body.message, 3000, false, true);
      }

      return res;
    }),
    catchError((err) => {
      let message = 'خطای ناشناخته‌ای رخ داد';

      if (err instanceof HttpErrorResponse) {
        if (err.status === 0) {
          message = 'ارتباط با سرور برقرار نیست. لطفاً اتصال اینترنت خود را بررسی کنید';
        } else if (err.status === 401) {
          message = 'شما به این بخش دسترسی ندارید. لطفا ابتدا وارد شوید';
        } else if (err.status >= 500) {
          message = 'خطایی در سرور رخ داده است. لطفاً بعداً تلاش کنید';
        } else if (err.error?.message) {
          message = err.error.message;
        } else {
          message = `خطا(${err.status}): ${err.statusText}`;
        }
      }
      else {
        message = err.message;
      }

      console.error('Interceptor caught error:', err);

      if (!skipAlertApis.includes(err.url)) {
        alertService.newAlert(message, 3000, false, true);
      }

      return throwError(() => err);
    }), finalize(() => {
      if (loadingServiceApis.includes(currentRequest.url)) {
        loadingService.hide();
      }
    })
  );
};
