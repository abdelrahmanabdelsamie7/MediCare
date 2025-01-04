import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SAuthService {

private readonly _HttpClient=inject(HttpClient)
setRegisterForm(data:object):Observable<any>{
 return this._HttpClient.post(`${environment.baseUrl}/user/register`,data)

}
setLoginForm(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/user/login`,data)

 }

}
