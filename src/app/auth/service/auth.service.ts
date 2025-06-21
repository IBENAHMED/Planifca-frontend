import { Router } from '@angular/router';
import { login } from '../model/login-type';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly urlApi: string = `${environment.baseUrl}`;
  private http = inject(HttpClient);
  private router = inject(Router);

  userRoles: string[] = [];
  private tokenKey = 'token';
  private userContextKey = 'userContext';
  private userContext: any = localStorage.getItem(this.userContextKey);

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
    // todo: chnage forgot to forget
    return this.http.post(
      `${this.urlApi}/auth/forget-password`,
      { email: email },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'clubRef': JSON.parse(this.userContext).reference,
        }),
      }
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  };

  resetPassword(newPassword: string, confirmPassword: string, token: string): Observable<any> {
    return this.http.post(
      `${this.urlApi}/auth/reset-password`,
      {
        token,
        newPassword,
        confirmPassword,
      },
    ).pipe(
      catchError((error) => {
        throw error;
      })
    );
  };

  activateUserAccount(userId: string, club: string, newPassword: string, confirmPassword: string): Observable<any> {
    // todo: refactor from backend responseType should be JSON
    return this.http.post(
      `${this.urlApi}/auth/activate?frontpath=${club}&userId=${userId}`,
      {
        newPassword,
        confirmPassword,
      },
      {
        responseType: 'text'
      }
    ).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  };

  isFrontPathExist(frontPath: string | null): Observable<any> {
    return this.http.get(`${this.urlApi}/club/front/${frontPath}`).pipe(
      catchError((error) => {
        throw error;
      }),
    );
  };

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  };

  getUserRole(): Observable<any> {
    const token = localStorage.getItem(this.tokenKey);
    return this.http.get(`${this.urlApi}/user/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
  }

  async hasRole(requiredRoles: string[]): Promise<boolean> {
    if (this.userRoles.length > 0) {
      return requiredRoles.some(role => this.userRoles.includes(role));
    }

    const token = localStorage.getItem(this.tokenKey);

    try {
      const response = await fetch(`${this.urlApi}/user/current`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user roles');
      }

      const data = await response.json();
      this.userRoles = data.roles;
      return requiredRoles.some(role => this.userRoles.includes(role));
    } catch (error) {
      return false;
    }
  }
};
