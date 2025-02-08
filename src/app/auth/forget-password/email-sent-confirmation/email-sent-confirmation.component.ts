import { NgIf } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { AuthService } from '../../service/auth.service';
import { Component, inject, Input, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-email-sent-confirmation',
  standalone: true,
  imports: [NgIf],
  templateUrl: './email-sent-confirmation.component.html',
  styleUrl: './email-sent-confirmation.component.scss'
})
export class EmailSentConfirmationComponent implements OnDestroy {

  private destroy$ = new Subject<void>();
  private subscription: Subscription | null = null;

  private authService = inject(AuthService);

  @Input() email: string = '';
  isEmailResent: boolean = false;

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  };

  resendEmail() {
    this.subscription = this.authService.forgetPassword(this.email)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isEmailResent = true;

          setTimeout(() => {
            this.isEmailResent = false;
          }, 3000);
        },
        error: () => {
          alert("Internal server error");
        },
      });
  };
};
