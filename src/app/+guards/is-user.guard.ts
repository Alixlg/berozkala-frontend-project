import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { BackendService } from '../+shared/services/backend.service';
import { AuthCheckModel } from '../+navigations/public-navigations/models/auth-check.model';
import { AccountRole } from '../+shared/enums/account-role';
import { catchError, finalize, map, of } from 'rxjs';
import { AlertService } from '../+components/alert-system/service/alert.service';
import { LoadingService } from '../+components/loading/service/loading.service';

export const isUserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const backendService = inject(BackendService);
  const alertService = inject(AlertService);
  const loadingService = inject(LoadingService);

  const token = sessionStorage.getItem('token') ?? localStorage.getItem('token');

  if (!token) {
    router.navigateByUrl('/login');
    alertService.newAlert('لطفا ابتدا وارد شوید یا ثبت نام کنید', 3000, true);
    return of(false);
  }

  loadingService.show();

  return backendService.get<AuthCheckModel>('api/v1/auth/valid-token').pipe(
    map(res => {
      if (res.isSuccess &&
        res.body &&
        res.body.isSingIn && res.body.accountRole === AccountRole.user) {
        return true;
      } else {
        router.navigateByUrl('/login');
        alertService.newAlert('لطفا ابتدا وارد شوید یا ثبت نام کنید', 3000, true);
        return false;
      }
    }),
    catchError(err => {
      router.navigateByUrl('/login');
      alertService.newAlert('لطفا ابتدا وارد شوید یا ثبت نام کنید', 3000, true);
      return of(false);
    }),
    finalize(() => loadingService.hide())
  );
};
