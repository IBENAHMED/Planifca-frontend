import { takeUntil } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import {
  Validators,
  FormsModule,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { URLS } from '../../components/helpers/url-constants';
import { AuthLayoutComponentComponent } from '../layout/auth-layout-component.component';
import { TagButtonComponent } from '../../components/tag/tag-button/tag-button.component';
import { FormInputEmailComponent } from '../../components/form/form-input-email/form-input-email.component';
import { EmailSentConfirmationComponent } from './email-sent-confirmation/email-sent-confirmation.component';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    RouterLink,
    FormsModule,
    TagButtonComponent,
    ReactiveFormsModule,
    FormInputEmailComponent,
    AuthLayoutComponentComponent,
    EmailSentConfirmationComponent,
  ],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent implements OnDestroy {

  private destroy$ = new Subject<void>();
  private subscription: Subscription | null = null;

  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  urlDefault = URLS.DEFAULT;
  isEmailSent: boolean = false;

  emailControl: FormControl = this.formBuilder.control('', [Validators.required, Validators.email]);

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  };

  onSubmit(): void {
    this.subscription = this.authService.forgetPassword(this.emailControl.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.isEmailSent = true;
        },
        error: () => {
          alert("Internal server error");
        },
      });
  };
};
