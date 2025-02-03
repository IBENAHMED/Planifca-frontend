import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { adminConnexion } from '../../../model/admin-connexion.type';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly urlApi: string = `${environment.baseUrl}/api/internal/auth`;

  constructor(private http: HttpClient) { };

  login(credentials: adminConnexion): Observable<any> {
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
    console.log({ "url": url, "newPassword": { newPassword }, "headers": { headers } })

    return this.http.post(url, { newPassword }, { headers });
  }
};
