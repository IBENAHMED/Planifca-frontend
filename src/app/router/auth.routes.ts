import { Routes } from '@angular/router';
import { URLS } from '../components/helpers/url-constants';
import { ConnexionComponent } from '../auth/connexion/connexion.component';
import { ForgetPasswordComponent } from '../auth/forget-password/forget-password.component';
import { ResetPasswordComponent } from '../auth/reset-password/reset-password.component';

export const authRoutes: Routes = [
  {
    path: URLS.DEFAULT,
    pathMatch: 'full',
    component: ConnexionComponent,
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
    path: ':userType/login',
    pathMatch: 'full',
    component: ConnexionComponent,
  },
];
