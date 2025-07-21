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
import { login } from '../model/login-type';
import { AuthService } from '../service/auth.service';
import { URLS } from '../../components/helpers/url-constants';
import { TagAComponent } from '../../components/tag/tag-a/tag-a.component';
import { AuthLayoutComponentComponent } from '../layout/auth-layout-component.component';
import { TagButtonComponent } from '../../components/tag/tag-button/tag-button.component';
import { FormInputEmailComponent } from '../../components/form/form-input-email/form-input-email.component';
import { FormInputPasswordComponent } from '../../components/form/form-input-password/form-input-password.component';
import { response } from 'express';
import constants from '../../components/constants';
import { UserContextService } from '../../components/services/user-context.service';
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
  private userContextService = inject(UserContextService);

  isError: boolean = false;
  frontPath: string | null = null;
  resetPasswordUrl = URLS.PASSWORD_FORGET;

  loginForm: FormGroup = this.formBuilder.group({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  });

  ngOnInit(): void {
    const currentUrl = this.route.url;
    const frontPath = currentUrl.split('/')[1];

    const userContext = this.userContextService.getUserContext()
    const savedfrontPath = userContext ? userContext.frontPath : null;

    if (frontPath && frontPath !== savedfrontPath) {
      this.userContextService.clearUserContext();

      this.authService.isFrontPathExist(frontPath).subscribe({
        next: (club) => {
          const newContext = {
            reference: club.reference,
            name: club.name,
            frontPath: club.frontPath,
            active: club.active
          };
          this.userContextService.setUserContext(newContext)

          // naviguer vers la même route avec nouveau contexte
          this.route.navigate([`/${frontPath}/login`], { replaceUrl: true });
        },
        error: () => {
          this.route.navigate(['/']);
        }
      });
    }
  }

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
          this.authService.getCurrentUser().subscribe({
            next: (response) => {
              if (response.roles.includes(constants.USER.SUPERADMIN)) {
                this.route.navigate([`${this.frontPath}/club`])
              }

              if (response.roles.includes(constants.USER.ADMIN)) {
                this.route.navigate([`${this.frontPath}/administration`])
              }

              if (response.roles.includes(constants.USER.STAFF)) {
                this.route.navigate([`${this.frontPath}/reservation`])
              }
            },
            error: () => {
              console.log("")
            },
          });
        },
        error: ({ status }) => {
          this.isError = [404, 401].includes(status);
          if (!this.isError) console.log("")
        },
      });

    this.subscriptions.push(loginSubscription);
  };
};
