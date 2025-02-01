import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { adminConnexion } from '../../../model/admin-connexion.type';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: adminConnexion): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/internal/auth/login`, credentials);
  };

  forgetPassword(email: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/api/internal/auth/forgot-password`, { email: email }); //todo: chnage forgot to forget
  };
};
