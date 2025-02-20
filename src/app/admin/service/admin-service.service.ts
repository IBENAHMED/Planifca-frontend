import { catchError, Observable } from 'rxjs';
import { club } from '../model/club-type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  private readonly urlApi: string = `${environment.baseUrl}`;
  private http = inject(HttpClient)

  createClub(dataClub: club): Observable<any> {
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
