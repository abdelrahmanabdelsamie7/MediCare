import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
export const adminGuard: CanActivateFn = (route, state) => {
  const _Router = inject(Router);
  if (localStorage.getItem('adminToken')) {
    return true;
  } else {
    return _Router.navigate(['/admin-login']);
  }
};
