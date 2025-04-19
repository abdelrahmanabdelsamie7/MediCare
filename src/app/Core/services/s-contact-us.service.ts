import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactUs } from '../interfaces/contact-us';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SContactUsService {
  constructor(private _HttpClient: HttpClient) { }
  getAllContactData(): Observable<ContactUs[]> {
    return this._HttpClient.get<ContactUs[]>(
      `${environment.baseUrl}/contact-us`,
    );
  }
  addContactUs(contactUs: ContactUs): Observable<ContactUs> {
    return this._HttpClient.post<ContactUs>(
      `${environment.baseUrl}/contact-us`,
      contactUs,

    );
  }
  showContactUs(id: string): Observable<ContactUs> {
    return this._HttpClient.get<ContactUs>(
      `${environment.baseUrl}/contact-us/${id}`,
    );
  }
  deleteContactUs(id: string): Observable<ContactUs> {
    return this._HttpClient.delete<ContactUs>(
      `${environment.baseUrl}/contact-us/${id}`,

    );
  }
  replyToContact(id: string, reply: string): Observable<ContactUs> {
    return this._HttpClient.post<ContactUs>(
      `${environment.baseUrl}/contact-us/${id}/reply`,
      reply
    );
  }
}
