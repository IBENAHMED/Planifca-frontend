import { Router } from '@angular/router';
import { login } from '../model/login-type';
import { firstValueFrom, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserContextService } from '../../components/services/user-context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly urlApi: string = `${environment.baseUrl}`;
  private http = inject(HttpClient);
  private router = inject(Router);
  private userContextService = inject(UserContextService);

  userRoles: string[] = [];

  login(credentials: login): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.urlApi}/auth/login`,
      credentials
    ).pipe(
      tap(response => this.userContextService.setToken(response.token)),
      catchError(error => throwError(() => error))
    );
  }


  logout(): void {
    this.userContextService.clearToken()
    const frontPath = this.userContextService.getUserContext()?.frontPath || '';
    this.router.navigate([`/${frontPath}/login`]);
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post(
      `${this.urlApi}/auth/forget-password`,
      { email: email }
    ).pipe(
      catchError((error) => throwError(() => error)),
    );
  }

  resetPassword(newPassword: string, confirmPassword: string, token: string): Observable<any> {
    return this.http.post(
      `${this.urlApi}/auth/reset-password`,
      { token, newPassword, confirmPassword }
    ).pipe(
      catchError((error) => throwError(() => error)),
    );
  }

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
      catchError((error) => throwError(() => error)),
    );
  }

  isFrontPathExist(frontPath: string | null): Observable<any> {
    return this.http.get(`${this.urlApi}/club/front/${frontPath}`).pipe(
      catchError((error) => throwError(() => error)),
    );
  }

  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('token');
    }
    return false;
  }

  getUserRole(): Observable<any> {
    return this.http.get(`${this.urlApi}/user/current`);
  }

  async hasRole(requiredRoles: string[]): Promise<boolean> {
    if (this.userRoles.length > 0) {
      return requiredRoles.some(role => this.userRoles.includes(role));
    }

    const token = this.userContextService.getToken();
    if (!token) {
      return false;
    }

    try {
      const response: any = await firstValueFrom(
        this.http.get(`${this.urlApi}/user/current`)
      );

      this.userRoles = response.roles;
      return requiredRoles.some(role => this.userRoles.includes(role));
    } catch {
      return false;
    }
  }
}
