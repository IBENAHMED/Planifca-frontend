import { Observable } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { connexion } from '../../model/connexion.type';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly urlApi: string = `${environment.baseUrl}/api/internal/auth`;

  private http = inject(HttpClient)

  login(credentials: connexion): Observable<any> {
    return this.http.post(`${this.urlApi}/login`, credentials);
  };

  forgetPassword(email: string): Observable<any> {
    return this.http.post(`${this.urlApi}/forget-password`, { email: email });
  };

  resetPassword(newPassword: string, token: string): Observable<any> {
    const url = `${this.urlApi}/reset-password`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': token,
    });

    return this.http.post(url, { newPassword }, { headers });
  }
};
