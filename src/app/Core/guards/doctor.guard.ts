import { CanActivateFn } from '@angular/router';

export const doctorGuard: CanActivateFn = (route, state) => {
  return true;
};
