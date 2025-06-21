import { catchError, Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ClubServiceService {

  private http = inject(HttpClient);
  private readonly urlApi: string = `${environment.baseUrl}`;

  createAdministration(dataAdministration: any): Observable<any> {

    return this.http.post(`${this.urlApi}/user/register`, dataAdministration).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  getAllAdministration(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.urlApi}/user/getUserList?page=${page}&size=${pageSize}`).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  };
}
