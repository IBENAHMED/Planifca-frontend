import { Injectable } from '@angular/core';
import { adminConnexion } from '../model/admin-connexion.type';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConnexionService {
  private readonly apiUrl: string = `${environment.baseUrl}/api/v1/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: adminConnexion): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  };
};
