import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const doctorGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if (localStorage.getItem('doctorToken')) {
    return true;
  } else {
    return _Router.navigate(['/doctor-login']);
  }
};
