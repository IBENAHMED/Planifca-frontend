import { Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { URLS } from '../components/helpers/url-constants';
import { LoginComponent } from '../auth/login/login.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';
import { ForgetPasswordComponent } from '../auth/forget-password/forget-password.component';
import { ActivateAccountComponent } from '../auth/activate-account/activate-account.component';

export const authRoutes: Routes = [
  {
    path: URLS.DEFAULT,
    pathMatch: 'full',
    component: AppComponent
  },
  {
    path: URLS.PASSWORD_FORGET,
    component: ForgetPasswordComponent,
  },
  {
    path: URLS.PASSWORD_RESET,
    component: ResetPasswordComponent,
  },
  {
    path: ':frontPath/login',
    pathMatch: 'full',
    component: LoginComponent,
  },
  // todo add acoount in bacend and frontend
  {
    path: URLS.ACTIVATE_ACCOUNT,
    component: ActivateAccountComponent,
  },
];
