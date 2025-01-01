import { HttpInterceptorFn } from '@angular/common/http';

import { inject } from '@angular/core';
import { SLoadingService } from '../services/s-loading.service';
import { finalize } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const LoadingService = inject(SLoadingService);
  const getTokenForRole = (url: string): string | null => {
    if (url.includes('/admin')) {
      return localStorage.getItem('adminToken');
    } else if (url.includes('/doctor')) {
      return localStorage.getItem('doctorToken');
    } else if (url.includes('/user')) {
      return localStorage.getItem('userToken');
    }
    return null;
  };
  const token = getTokenForRole(req.url);
  LoadingService.setLoading(true);
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return next(req).pipe(
    finalize(() => {
      LoadingService.setLoading(false);
    })
  );
};
