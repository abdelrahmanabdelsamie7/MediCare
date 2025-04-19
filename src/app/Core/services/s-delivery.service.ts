import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IDelivery } from '../interfaces/i-delivery';

@Injectable({
  providedIn: 'root'
})
export class SDeliveryService {

  constructor(private _HttpClient: HttpClient) { }
  getDeliveryServices(): Observable<IDelivery[]> {
    return this._HttpClient.get<IDelivery[]>(
      `${environment.baseUrl}/Delivery_Services`
    );
  }
  addDeliveryService(delivery: IDelivery): Observable<IDelivery> {
    return this._HttpClient.post<IDelivery>(
      `${environment.baseUrl}/Delivery_Services`,
      delivery,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  showDeliverService(id: string): Observable<IDelivery> {
    return this._HttpClient.get<IDelivery>(
      `${environment.baseUrl}/Delivery_Services/${id}`
    );
  }
  editDeliverService(id: string, delivery: IDelivery): Observable<IDelivery> {
    return this._HttpClient.put<IDelivery>(
      `${environment.baseUrl}/Delivery_Services/${id}`,
      delivery,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }
  deleteDeliverService(id: string): Observable<IDelivery> {
    return this._HttpClient.delete<IDelivery>(
      `${environment.baseUrl}/Delivery_Services/${id}`,
      {
        headers: {
          Authorization: 'Bearer' + localStorage.getItem('adminToken'),
        },
      }
    );
  }


}
