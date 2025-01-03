
import {
  HttpInterceptorFn,
} from '@angular/common/http';
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // const getTokenForRole = (url: string): string | null => {
  //   if (url.includes('/admin')) {
  //     return localStorage.getItem('adminToken');
  //   } else if (url.includes('/doctor')) {
  //     return localStorage.getItem('doctorToken');
  //   } else if (url.includes('/user')) {
  //     return localStorage.getItem('userToken');
  //   }
  //   return null;
  // };
  // const token = getTokenForRole(req.url);
  // const LoadingService = inject(SLoadingService);
  // LoadingService.setLoading(true);
  // if (token) {
  //   req = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // }
  // return next(req).pipe(
  //   finalize(() => {
  //     LoadingService.setLoading(false);
  //   })
  // );
  return next(req);
};
