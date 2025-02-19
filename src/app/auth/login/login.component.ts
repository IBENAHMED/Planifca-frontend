import { NgClass } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import constants from '../../components/constants';
import { AuthService } from '../service/auth.service';
import { login } from '../../model/auth/login-type';
import { URLS } from '../../components/helpers/url-constants';
import { TagAComponent } from '../../components/tag/tag-a/tag-a.component';
import { AuthLayoutComponentComponent } from '../layout/auth-layout-component.component';
import { TagButtonComponent } from '../../components/tag/tag-button/tag-button.component';
import { FormInputEmailComponent } from '../../components/form/form-input-email/form-input-email.component';
import { FormInputPasswordComponent } from '../../components/form/form-input-password/form-input-password.component';
@Component({
  selector: 'login-auth',
  standalone: true,
  imports: [
    NgClass,
    FormsModule,
    TagAComponent,
    TagButtonComponent,
    ReactiveFormsModule,
    FormInputEmailComponent,
    FormInputPasswordComponent,
    AuthLayoutComponentComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();
  private subscriptions: Subscription[] = [];

  private route = inject(Router)
  private authService = inject(AuthService);
  private formBuilder = inject(FormBuilder);
  private activatedRoute = inject(ActivatedRoute);

  frontPath: string | null = null;
  isError: boolean = false;
  resetPasswordUrl = URLS.PASSWORD_FORGET;

  loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  ngOnInit(): void {
    const routeSubscription = this.activatedRoute.paramMap.subscribe(param => {
      this.frontPath = param.get('frontPath');

      if (this.frontPath) {
        this.authService.checkUserRole(this.frontPath).subscribe({
          error: () => {
            this.route.navigate([URLS.DEFAULT])
          },
        });
      }
    });

    this.subscriptions.push(routeSubscription);
  };

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    this.destroy$.next();
    this.destroy$.complete();
  };

  get emailControl(): FormControl {
    return this.loginForm.get('email') as FormControl;
  };

  get passwordControl(): FormControl {
    return this.loginForm.get('password') as FormControl;
  };

  onSubmit(): void {
    const credentials: login = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };

    const loginSubscription = this.authService.login(credentials)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.route.navigate([URLS.ADMIN]);
        },
        error: ({ status }) => {
          this.isError = [404, 401].includes(status);
          if (!this.isError) alert("Internal server error");
        },
      });

    this.subscriptions.push(loginSubscription);
  };
};
