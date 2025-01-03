import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { IDoctorBlog } from '../interfaces/i-doctor-blog';

@Injectable({
  providedIn: 'root',
})
export class SDoctorBlogService {
  constructor(private _HttpClient: HttpClient) {}
  getDoctorBlogs(): Observable<IDoctorBlog[]> {
    return this._HttpClient.get<IDoctorBlog[]>(`${environment.baseUrl}/Blogs`, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
      },
    });
  }
  addDoctorBlog(doctorBlog: IDoctorBlog): Observable<IDoctorBlog> {
    return this._HttpClient.post<IDoctorBlog>(
      `${environment.baseUrl}/Blogs`,
      doctorBlog,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
  showDoctorBlog(id: string): Observable<IDoctorBlog> {
    return this._HttpClient.get<IDoctorBlog>(
      `${environment.baseUrl}/Blogs/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
  editDoctorBlog(id: string, doctorBlog: IDoctorBlog): Observable<IDoctorBlog> {
    return this._HttpClient.put<IDoctorBlog>(
      `${environment.baseUrl}/Blogs/${id}`,
      doctorBlog,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
  deleteDoctorBlog(id: string): Observable<IDoctorBlog> {
    return this._HttpClient.delete<IDoctorBlog>(
      `${environment.baseUrl}/Blogs/${id}`,
      {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('doctorToken'),
        },
      }
    );
  }
}
