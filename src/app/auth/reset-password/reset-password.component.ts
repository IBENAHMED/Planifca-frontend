import { NgClass } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { AuthService } from '../service/auth.service';
import { AuthLayoutComponentComponent } from '../layout/auth-layout-component.component';
import { TagButtonComponent } from '../../components/tag/tag-button/tag-button.component';
import { FormInputPasswordComponent } from '../../components/form/form-input-password/form-input-password.component';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    TagButtonComponent,
    ReactiveFormsModule,
    FormInputPasswordComponent,
    AuthLayoutComponentComponent,
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  private subscription: Subscription | null = null;

  private routes: any = inject(Router);
  private route: any = inject(ActivatedRoute);
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);

  token: string | null = null;

  passwordForm: FormGroup = this.formBuilder.group({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]{6,}$')
    ]),
    confirmPassword: new FormControl('', [Validators.required]),
  }, { validators: this.passwordsMatchValidators });

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');
  };

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  };

  get newPasswordControl(): FormControl {
    return this.passwordForm.get('newPassword') as FormControl;
  };

  get confirmPasswordControl(): FormControl {
    return this.passwordForm.get('confirmPassword') as FormControl;
  };

  passwordsMatchValidators(formGroup: FormGroup) {
    const password = formGroup.get("newPassword")?.value;
    const confirmPassword = formGroup.get("confirmPassword")?.value;
    return password === confirmPassword ? null : { passwordsMismatch: true };
  };

  resetPassword(newPassword: string, confirmPassword: string, token: string) {
    this.subscription = this.authService.resetPassword(newPassword, confirmPassword, token)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          // this.route.navigate([`/${JSON.parse(localStorage.getItem('userContext') || '{}').frontPath}/login`])
          console.log("seccess")
          this.routes.navigate([`/space-clients/login`])
        },
        error: () => {
          alert("Internal server error");
        },
      });
  };

  onSubmit(): void {
    if (!this.passwordForm.valid || !this.token) return;
    this.resetPassword(this.passwordForm.get('newPassword')?.value, this.passwordForm.get('confirmPassword')?.value, this.token);
  };
};
