import { CanActivateFn, Router } from '@angular/router';
import { AlertService } from '../+components/alert-system/service/alert.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token') ?? localStorage.getItem('token');
  const alertService = inject(AlertService);
  const router = inject(Router);

  if (token) {
    alertService.newAlert('شما به ورود یا ثبت نام دسترسی ندارید لطفا ابتدا از اکانت خود خارج شوید', 3000, true);
    router.navigateByUrl('/pb');
    return false;
  } else {
    return true;
  }
};
