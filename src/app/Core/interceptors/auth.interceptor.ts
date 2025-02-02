import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { SLoadingService } from '../services/s-loading.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(SLoadingService);
  const tokens = [
    localStorage.getItem('adminToken'),
    localStorage.getItem('doctorToken'),
    localStorage.getItem('userToken'),
  ];
  loaderService.showLoader();
  let modifiedReq = req;
  const validToken = tokens.find((token) => token);
  if (validToken) {
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${validToken}`,
      },
    });
  }
  return next(modifiedReq).pipe(
    catchError((error) => {
      console.error('Error in request:', error);
      loaderService.hideLoader();
      return throwError(() => error);
    }),

    finalize(() => {
      loaderService.hideLoader();
    })
  );
};
