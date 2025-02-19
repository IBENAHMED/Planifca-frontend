import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { login } from '../../model/auth/login-type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly urlApi: string = `${environment.baseUrl}`;
  private http = inject(HttpClient);
  private router = inject(Router);

  private tokenKey = 'token';
  private userContextKey = 'userContext';
  private userContext: any = localStorage.getItem('userContext');

  login(credentials: login): Observable<any> {
    return this.http.post(
      `${this.urlApi}/auth/login`,
      credentials,
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'clubRef': JSON.parse(this.userContext).reference,
        }),
      }
    ).pipe(
      tap((response: any) => localStorage.setItem(this.tokenKey, response.token)),
      catchError((error) => {
        throw error;
      }),
    );
  };

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate([`/${JSON.parse(this.userContext).frontPath}/login`]);
  };

  forgetPassword(email: string): Observable<any> {
    return this.http.post(`${this.urlApi}/auth/forget-password`, { email: email }).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  };

  resetPassword(newPassword: string, token: string): Observable<any> {
    return this.http.post(
      `${this.urlApi}/auth/reset-password`,
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

  checkUserRole(frontPath: string | null): Observable<any> {
    return this.http.get(`${this.urlApi}/club/front/${frontPath}`).pipe(
      tap((response) => localStorage.setItem(this.userContextKey, JSON.stringify(response))),
      catchError((error) => {
        throw error;
      }),
    );
  };

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  };
};
