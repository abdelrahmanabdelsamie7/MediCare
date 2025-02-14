import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
    const _Router = inject(Router);
    if (localStorage.getItem('userToken')) {
      return true;
    } else {
      return _Router.navigate(['/Register']);
    }
};
