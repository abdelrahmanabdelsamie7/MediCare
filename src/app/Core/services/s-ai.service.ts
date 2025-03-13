import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { IAi } from '../interfaces/i-ai';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class SAiService {
  private apiUrl = environment.baseUrl;
  private headers = new HttpHeaders({ 'Skip-Loading': 'true' });

  constructor(private http: HttpClient) {}

  analyzeTextAndImage(text: string, file: File | null): Observable<IAi> {
    const formData = new FormData();
    if (text) formData.append('text', text);
    if (file) formData.append('image', file);
    return this.http.post<IAi>(`${this.apiUrl}/ai-analysis`, formData, { headers: this.headers });
  }

  searchDepartments(searchTerm: string): Observable<any[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<any>(`${this.apiUrl}/Departments`, { params, headers: this.headers }).pipe(
      map(response => response.data.data)
    );
  }
}
