import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpContextToken
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

export const CACHE_TTL = new HttpContextToken<number>(() => 300000); // 5 minutes
export const NO_CACHE = new HttpContextToken<boolean>(() => false);

@Injectable()
export class CacheInterceptor {
  private cache = new Map<string, { data: any; expires: number }>();
  private readonly CACHE_HEADERS = {
    'Cache-Control': 'max-age=31536000',
    'Pragma': 'no-cache'
  };
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.context.get(NO_CACHE)) return next.handle(req);

    return req.method === 'GET'
      ? this.handleCachableRequest(req, next)
      : this.handleMutationRequest(req, next);
  }

  private handleCachableRequest(req: HttpRequest<any>, next: HttpHandler) {
    const cacheKey = this.createCacheKey(req);
    const cached = this.cache.get(cacheKey);

    if (cached && Date.now() < cached.expires) {
      console.log('Cache HIT:', cacheKey);
      return of(new HttpResponse({ body: cached.data }));
    }
    console.log('Cache MISS:', cacheKey);
    return this.sendRequest(req, next, cacheKey);
  }

  private sendRequest(req: HttpRequest<any>, next: HttpHandler, cacheKey: string) {
    const sanitizedReq = req.clone({ setHeaders: this.CACHE_HEADERS });
    const ttl = req.context.get(CACHE_TTL);

    return next.handle(sanitizedReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cache.set(cacheKey, { data: event.body, expires: Date.now() + ttl });
        }
      }),
      shareReplay(1)
    );
  }

  private handleMutationRequest(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.clearRelatedCache(req.url);
        }
      })
    );
  }

  private createCacheKey(req: HttpRequest<any>): string {
    const params = [...req.params.keys()]
      .sort()
      .map(key => `${key}=${req.params.get(key)}`)
      .join('&');

    return `${req.url}?${params}`;
  }

  private clearRelatedCache(url: string): void {
    const patterns = this.getInvalidationPatterns(url);

    Array.from(this.cache.keys()).forEach(key => {
      if (patterns.some(pattern => key.startsWith(pattern))) {
        this.cache.delete(key);
      }
    });
  }

  private getInvalidationPatterns(url: string): string[] {
    const segments = url.split('/');
    const patterns = [url];

    if (segments.length > 1) {
      const parentPath = segments.slice(0, -1).join('/');
      patterns.push(`${parentPath}`, `${parentPath}/*`);
    }
    return patterns;
  }
}
