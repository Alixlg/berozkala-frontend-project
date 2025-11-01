import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize, tap } from 'rxjs';
import { LoadingService } from '../+components/loading/service/loading.service';
import { environment } from '../../environments/environment';

export const mainInterceptor: HttpInterceptorFn = (req, next) => {
  let currentRequest = req;
  let loadingService = inject(LoadingService);

  const token: string | null = sessionStorage.getItem('token') != null ? sessionStorage.getItem('token') : localStorage.getItem('token');

  const loadingServiceApis = [
    `${environment.ServerAddress}api/v1/auth/valid-token`,
    `${environment.ServerAddress}api/v1/address/delete`,
    `${environment.ServerAddress}api/v1/user/get-info`,
    `${environment.ServerAddress}api/v1/subcategorys/delete`,
    `${environment.ServerAddress}api/v1/productsprevirw/list`,
    `${environment.ServerAddress}api/v1/basket/get-products`,
    `${environment.ServerAddress}api/v1/basket/clear-product`,
    `${environment.ServerAddress}api/v1/basket/remove-product`,
    `${environment.ServerAddress}api/v1/basket/add-product`,
    `${environment.ServerAddress}api/v1/categorys/delete`
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
