import { Component, inject, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { NotificationService, Notification } from '../../services/notification.service';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgbToastModule, CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {

  show = true;

  notificationService = inject(NotificationService)

  constructor() { }
}
