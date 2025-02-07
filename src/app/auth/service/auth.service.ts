import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { connexion } from '../../model/connexion.type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly urlApi: string = `${environment.baseUrl}/api/internal/auth`;
  private http = inject(HttpClient);

  private tokenKey = 'token';

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  };

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  };

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  };

  login(credentials: connexion): Observable<any> {
    return this.http.post(`${this.urlApi}/login`, credentials).pipe(
      tap((response: any) => this.setToken(response.token)),
      catchError((error) => {
        throw error;
      }),
    );
  };

  forgetPassword(email: string): Observable<any> {
    return this.http.post(`${this.urlApi}/forget-password`, { email: email }).pipe(
      catchError((error) => {
        throw error;
      })
    );
  };

  resetPassword(newPassword: string, token: string): Observable<any> {
    return this.http.post(
      `${this.urlApi}/reset-password`,
      { newPassword },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-Requested-With': token,
        }),
      },
    ).pipe(
      catchError((error) => {
        throw error;
      })
    );
  };

  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  };
};
