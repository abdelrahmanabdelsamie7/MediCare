import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, finalize, throwError } from 'rxjs';
import { SLoadingService } from '../services/s-loading.service';
import { isPlatformBrowser } from '@angular/common';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(SLoadingService);
  const platformId = inject(PLATFORM_ID);
  
  const skipLoading = req.headers.has('Skip-Loading');
  if (!skipLoading) {
    loaderService.showLoader();
  }

  let modifiedReq = req;
  let tokens: string[] = [];
  if (isPlatformBrowser(platformId)) {
    tokens = [
      localStorage.getItem('adminToken') || '',
      localStorage.getItem('doctorToken') || '',
      localStorage.getItem('userToken') || '',
    ];
  }
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
      if (!skipLoading) {
        loaderService.hideLoader();
      }
      return throwError(() => error);
    }),
    finalize(() => {
      if (!skipLoading) {
        loaderService.hideLoader();
      }
    })
  );
};
