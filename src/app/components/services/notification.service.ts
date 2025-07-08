import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


export type NotificationType = 'success' | 'error' | 'warning' | 'info';

export interface Notification {
  type: NotificationType;
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  private notificationSubject = new Subject<Notification>();
  public notifications$ = this.notificationSubject.asObservable();

  constructor() { }

  success(message: string, duration: number = 3000) {
    this.notify('success', message, duration);
  }

  error(message: string, duration: number = 5000) {
    this.notify('error', message, duration);
  }

  warning(message: string, duration: number = 4000) {
    this.notify('warning', message, duration);
  }

  info(message: string, duration: number = 3000) {
    this.notify('info', message, duration);
  }

  private notify(type: NotificationType, message: string, duration: number = 3000) {
    this.notificationSubject.next({ type, message, duration });
  }
}
