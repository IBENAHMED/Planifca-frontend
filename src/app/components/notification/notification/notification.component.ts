import { Component, inject, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { NotificationService, Notification } from '../../services/notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnDestroy {

  notifications: Notification[] = [];
  private subscription: Subscription;
  private notificationService = inject(NotificationService)

  constructor() {
    this.subscription = this.notificationService.notifications$.subscribe(notif => {
      this.notifications.push(notif);
      timer(notif.duration ?? 3000).subscribe(() => {
        this.notifications = this.notifications.filter(n => n !== notif);
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
