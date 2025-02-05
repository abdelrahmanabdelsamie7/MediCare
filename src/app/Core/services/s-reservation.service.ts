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
  getUserReservations(): Observable<any> {
    return this._HttpClient.get<any>(
      `${environment.baseUrl}/user/reservations`
    );
  }
}
