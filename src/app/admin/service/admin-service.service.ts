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
    return this.http.post(`${this.urlApi}/club/newClub`, dataClub).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  };

  getAllClubs(page: number, pageSize: number): Observable<any> {
    return this.http.get(`${this.urlApi}/club?page=${page}&size=${pageSize}`).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  };

  getUserContext(): Observable<any> {
    return this.http.get(`${this.urlApi}/user/current`
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }

  chnagePassword(oldPassword: string, newPassword: string, confirmPassword: string, email: string): Observable<any> {
    return this.http.post(`${this.urlApi}/user/change-password/${email}`, {
      oldPassword,
      newPassword,
      confirmPassword,
    }).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  }
};
