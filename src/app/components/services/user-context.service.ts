import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserContextService {

  private readonly userContextKey = 'userContext';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  getUserContext(): any {
    if (this.isBrowser()) {
      const ctx = localStorage.getItem(this.userContextKey);
      return ctx ? JSON.parse(ctx) : null;
    }
    return null;
  }

  setUserContext(context: any): void {
    if (this.isBrowser()) {
      localStorage.setItem(this.userContextKey, JSON.stringify(context));
    }
  }

  clearToken(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
  }

   setToken(token: string): void {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

    getToken(): string | null {
    if (this.isBrowser()) {
      return localStorage.getItem('token');
    }
    return null;
  }

  clearUserContext(): void {
    if (this.isBrowser()) {
      localStorage.removeItem(this.userContextKey);
    }
  }
}
