import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AlertService } from '../+components/alert-system/service/alert.service';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';

export const alertInterceptor: HttpInterceptorFn = (req, next) => {
  const alertService = inject(AlertService);
  const skipAlertApis = [
    `${environment.ServerAddress}api/v1/auth/valid-token`,
    `${environment.ServerAddress}api/v1/auth/member/login-submit-code`,
    `${environment.ServerAddress}api/v1/auth/member/login-with-code`,
    `${environment.ServerAddress}api/v1/auth/member/login-with-username`,
    `${environment.ServerAddress}api/v1/auth/member/singup`,
    `${environment.ServerAddress}api/v1/auth/admin/login`,
    `${environment.ServerAddress}api/v1/products/list`,
    `${environment.ServerAddress}api/v1/productsprevirw/list`,
    `${environment.ServerAddress}api/v1/category/list`,
    `${environment.ServerAddress}api/v1/user/get-info`
  ];

  return next(req).pipe(
    tap((res: any) => {
      if (res.body && res.body.isSuccess == false && (!skipAlertApis.some(url => res.url.startsWith(url)))) {
        alertService.newAlert(res.body.message, 3000, false, true);
      }

      if (res.body && res.body.isSuccess == true && (!skipAlertApis.some(url => res.url.startsWith(url)))) {
        alertService.newAlert(res.body.message, 3000);
      }
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
          message = `(${err.status}) خطا : ${err.statusText}`;
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
    }),
  );
};
