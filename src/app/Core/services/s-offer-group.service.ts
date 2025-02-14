import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOfferGroup } from '../interfaces/i-offer-group';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SOfferGroupService {
   constructor(private _HttpClient: HttpClient) {}
    getOfferGroups(): Observable<IOfferGroup[]> {
      return this._HttpClient.get<IOfferGroup[]>(
        `${environment.baseUrl}/Offer_Groups`
      );
    }
    addOfferGroup(
      OfferGroup: IOfferGroup
    ): Observable<IOfferGroup> {
      return this._HttpClient.post<IOfferGroup>(
        `${environment.baseUrl}/Offer_Groups`,
        OfferGroup
      );
    }
    showOfferGroup(id: string): Observable<IOfferGroup> {
      return this._HttpClient.get<IOfferGroup>(
        `${environment.baseUrl}/Offer_Groups/${id}`
      );
    }
    editOfferGroup(
      id: string,
      OfferGroup: IOfferGroup
    ): Observable<IOfferGroup> {
      return this._HttpClient.put<IOfferGroup>(
        `${environment.baseUrl}/Offer_Groups/${id}`,
        OfferGroup
      );
    }
    deleteOfferGroup(id: string): Observable<IOfferGroup> {
      return this._HttpClient.delete<IOfferGroup>(
        `${environment.baseUrl}/Offer_Groups/${id}`
      );
    }
}
