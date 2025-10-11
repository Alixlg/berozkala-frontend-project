import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AlertService } from '../+components/alert-system/service/alert.service';
import { catchError, map, throwError } from 'rxjs';

export const mainInterceptor: HttpInterceptorFn = (req, next) => {
  let currentReuest = req;
  let alertService = inject(AlertService);

  const token: string | null = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token') : localStorage.getItem('token');

  if (token != null) {
    currentReuest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(currentReuest).pipe(
    map((res: any) => {
      if (res.body && res.body.isSuccess == false && res.url != 'http://localhost:5145/api/v1/auth/valid-token') {
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
          message = `خطا (${err.status}): ${err.statusText}`;
        }
      }
      else {
        message = err.message;
      }

      console.error('Interceptor caught error:', err);

      if (err.url != 'http://localhost:5145/api/v1/auth/valid-token') {
        alertService.newAlert(message, 3000, false, true);
      }

      return throwError(() => err);
    })
  );
};
