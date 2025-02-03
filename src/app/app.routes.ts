import { Routes } from '@angular/router';
import { URLS } from './components/helpers/url-constants';

export const routes: Routes = [
  {
    path: ':userType',
    pathMatch: 'full',
    loadComponent() {
      return import("./auth/connexion/connexion.component").then((m) => m.ConnexionComponent)
    },
  },
  {
    path: URLS.DEFAULT,
    pathMatch: 'full',
    loadComponent() {
      return import("./auth/connexion/connexion.component").then((m) => m.ConnexionComponent)
    },
  },
  {
    path: URLS.PASSWORD_FORGET,
    loadComponent() {
      return import("./auth/forget-password/forget-password.component").then((m) => m.ForgetPasswordComponent)
    },
  },
  {
    path: URLS.PASSWORD_RESET,
    loadComponent() {
      return import("./auth/reset-password/reset-password.component").then((m) => m.ResetPasswordComponent)
    },
  },
];
