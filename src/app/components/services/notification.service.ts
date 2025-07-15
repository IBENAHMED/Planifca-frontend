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

  constructor() { }

  toasts: { message: string, classname: string, delay?: number }[] = [];

  show(message: string, options: { classname?: string, delay?: number } = {}) {
    this.toasts.push({
      message,
      classname: options.classname || 'bg-info text-white',
      delay: 300000
    });
  }
  success(message: string) {
    this.show(message, { classname: 'bg-success text-white', delay: 3000 });
  }

  error(message: string) {
    this.show(message, { classname: 'bg-danger', delay: 300000 });
  }

  info(message: string) {
    this.show(message, { classname: 'bg-info text-white', delay: 3000 });
  }

  warning(message: string) {
    this.show(message, { classname: 'bg-warning text-dark', delay: 3000 });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
