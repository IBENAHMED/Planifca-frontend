import { catchError, Observable } from 'rxjs';
import { createClub } from '../model/club-type';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private http = inject(HttpClient);
  private readonly urlApi: string = `${environment.baseUrl}`;

  createClub(dataClub: createClub): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.urlApi}/club/newClub`, dataClub, { headers }).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  };
};
