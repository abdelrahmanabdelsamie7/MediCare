import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { SLoadingService } from '../services/s-loading.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let modifiedReq = req;
  const loaderService = inject(SLoadingService);

  loaderService.showLoader();

  if (localStorage.getItem('adminToken')) {
    const adminToken = localStorage.getItem('adminToken');
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${adminToken}`,
      },
    });
  }
  if (localStorage.getItem('doctorToken')) {
    const doctorToken = localStorage.getItem('doctorToken');
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${doctorToken}`,
      },
    });
  }
  if (localStorage.getItem('userToken')) {
    const userToken = localStorage.getItem('userToken');
    modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${userToken}`,
      },
    });
  }

  return next(modifiedReq).pipe(
    catchError((error) => {
      console.error('Error in request:', error);
      loaderService.showLoader();
      return throwError(() => error);
    }),

    finalize(() => {
      loaderService.hideLoader();
    })
  );
};
