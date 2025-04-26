import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/i-user';
import { NO_CACHE } from '../interceptors/cache.interceptor';

@Injectable({
  providedIn: 'root',
})
export class SAuthService {
  private tempEmail: string = ''; // Temporary storage for email
  private readonly _HttpClient = inject(HttpClient);
  setRegisterForm(data: IUser): Observable<IUser> {
    return this._HttpClient.post<IUser>(
      `${environment.baseUrl}/user/register`,
      data
    );
  }
  setLoginForm(data: IUser): Observable<IUser> {
    return this._HttpClient.post<IUser>(
      `${environment.baseUrl}/user/login`,
      data
    );
  }
  getUserAccount(): Observable<IUser> {
    // bypass caching is bypassed.
    const context = new HttpContext().set(NO_CACHE, true);
    return this._HttpClient.get<IUser>(
      `${environment.baseUrl}/user/getaccount`,
      { context }
    );
  }
  // Notifications Of Reservations
  getUserNotifications(userId: string): Observable<any> {
    return this._HttpClient.get<any>(
      `${environment.baseUrl}/User_Notifications/${userId}`
    );
  }
  // Admin Else Get All Of Users
  getAllUsers(): Observable<IUser[]> {
    return this._HttpClient.get<IUser[]>(
      `${environment.baseUrl}/allusers`
    );
  }
  // Admin Else Get Specific User Info
  getUserById(id: string): Observable<IUser> {
    return this._HttpClient.get<IUser>(
      `${environment.baseUrl}/allusers/${id}`
    );
  }
  // Admin Else Delete Specific User
  removeUser(id: string): Observable<IUser> {
    return this._HttpClient.delete<IUser>(
      `${environment.baseUrl}/allusers/${id}`
    );
  }
  // New methods for Forgot Password and Reset Password
  forgotPassword(email: string): Observable<any> {
    return this._HttpClient.post<any>(
      `${environment.baseUrl}/user/password/forgot`,
      { email }
    );
  }

  resetPassword(email: string, token: string, password: string, passwordConfirmation: string): Observable<any> {
    return this._HttpClient.post<any>(
      `${environment.baseUrl}/user/password/reset`,
      {
        email,
        token,
        password,
        password_confirmation: passwordConfirmation
      }
    );
  }
  resendVerification(email: string): Observable<any> {
    return this._HttpClient.post<any>(
      `${environment.baseUrl}/user/resend-email`,
      { email }
    );
  }
  deleteAccount(password?: string): Observable<any> {
    const body = password ? { password } : {};
    return this._HttpClient.delete<any>(
      `${environment.baseUrl}/user/account`,
      {body}
    );
  }
   // New method to update the user profile
   updateProfile(payload: {
    name: string;
    phone: string;
    birth_date: Date|string;
  }): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/user/profile`, payload);
  }
  // New methods for email state
  setTempEmail(email: string): void {
    this.tempEmail = email;
  }

  getTempEmail(): string {
    return this.tempEmail;
  }

  clearTempEmail(): void {
    this.tempEmail = '';
  }
}
