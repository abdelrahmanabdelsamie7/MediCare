import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDoctorOffer } from '../interfaces/i-doctor-offer';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SDoctorOfferService {
  constructor(private _HttpClient: HttpClient) {}
  getDoctorOffers(): Observable<IDoctorOffer[]> {
    return this._HttpClient.get<IDoctorOffer[]>(
      `${environment.baseUrl}/Doctor_Offers`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
  addDoctorOffer(doctorOffer: IDoctorOffer): Observable<IDoctorOffer> {
    return this._HttpClient.post<IDoctorOffer>(
      `${environment.baseUrl}/Doctor_Offers`,
      doctorOffer,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
  showDoctorOffer(id: string): Observable<IDoctorOffer> {
    return this._HttpClient.get<IDoctorOffer>(
      `${environment.baseUrl}/Doctor_Offers/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
  editDoctorOffer(
    id: string,
    doctorOffer: IDoctorOffer
  ): Observable<IDoctorOffer> {
    return this._HttpClient.put<IDoctorOffer>(
      `${environment.baseUrl}/Doctor_Offers/${id}`,
      doctorOffer,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
  deleteDoctorOffer(id: string): Observable<IDoctorOffer> {
    return this._HttpClient.delete<IDoctorOffer>(
      `${environment.baseUrl}/Doctor_Offers/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
}
