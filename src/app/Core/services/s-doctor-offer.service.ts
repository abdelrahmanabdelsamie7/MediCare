import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDoctorOffer } from '../interfaces/i-doctor-offer';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IDoctorOfferImage } from '../interfaces/i-doctor-offer-image';

@Injectable({
  providedIn: 'root',
})
export class SDoctorOfferService {
  constructor(private _HttpClient: HttpClient) {}
  getDoctorOffers(): Observable<IDoctorOffer[]> {
    return this._HttpClient.get<IDoctorOffer[]>(
      `${environment.baseUrl}/Doctor_Offers`,
      
    );
  }
  addDoctorOffer(doctorOffer: IDoctorOffer): Observable<IDoctorOffer> {
    return this._HttpClient.post<IDoctorOffer>(
      `${environment.baseUrl}/Doctor_Offers`,
      doctorOffer,
      
    );
  }
  showDoctorOffer(id: string): Observable<IDoctorOffer> {
    return this._HttpClient.get<IDoctorOffer>(
      `${environment.baseUrl}/Doctor_Offers/${id}`,
      
    );
  }
  editDoctorOffer(
    id: string,
    doctorOffer: IDoctorOffer
  ): Observable<IDoctorOffer> {
    return this._HttpClient.put<IDoctorOffer>(
      `${environment.baseUrl}/Doctor_Offers/${id}`,
      doctorOffer,
      
    );
  }
  deleteDoctorOffer(id: string): Observable<IDoctorOffer> {
    return this._HttpClient.delete<IDoctorOffer>(
      `${environment.baseUrl}/Doctor_Offers/${id}`,
      
    );
  }

  addDoctorOfferImage(
    doctorOfferImage: IDoctorOfferImage
  ): Observable<IDoctorOffer> {
    return this._HttpClient.post<IDoctorOffer>(
      `${environment.baseUrl}/Doctor_Offer_Images`,
      doctorOfferImage,
      
    );
  }
  showDoctorOfferImage(id: string): Observable<IDoctorOffer> {
    return this._HttpClient.get<IDoctorOffer>(
      `${environment.baseUrl}/Doctor_Offer_Images/${id}`,
      
    );
  }
  editDoctorOfferImage(
    doctorOfferImage: IDoctorOfferImage,
    id: string
  ): Observable<IDoctorOffer> {
    return this._HttpClient.put<IDoctorOffer>(
      `${environment.baseUrl}/Doctor_Offer_Images/${id}`,
      doctorOfferImage,
      
    );
  }
  deleteDoctorOfferImage(id: string): Observable<IDoctorOffer> {
    return this._HttpClient.delete<IDoctorOffer>(
      `${environment.baseUrl}/Doctor_Offer_Images/${id}`,
      
    );
  }
}
