import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IReservation } from '../interfaces/i-reservation';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SReservationService {
  constructor(private _HttpClient: HttpClient) {}
  userReserveDoctor(reserve: IReservation): Observable<IReservation> {
    return this._HttpClient.post<IReservation>(
      `${environment.baseUrl}/reservations`,
      reserve
    );
  }
  confirmReservation(reservationId: string): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/reservations/${reservationId}/confirm`,
      reservationId
    );
  }
  cancelReservation(reservationId: string): Observable<any> {
    return this._HttpClient.put(
      `${environment.baseUrl}/reservations/${reservationId}/cancel`,
      reservationId
    );
  }
  getUserReservations(): Observable<any> {
    return this._HttpClient.get<any>(
      `${environment.baseUrl}/user/reservations`
    );
  }
  getDoctorReservations(): Observable<any> {
    return this._HttpClient.get<any>(
      `${environment.baseUrl}/doctor/reservations`
    );
  }
}
