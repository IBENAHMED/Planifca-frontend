import { Routes } from '@angular/router';
import { URLS } from './components/helpers/url-constants';

export const routes: Routes = [
  {
    path: ':userType',
    pathMatch: 'full',
    loadComponent() {
      return import("./admin/admin.component").then((m) => m.AdminComponent)
    },
  },
  {
    path: URLS.ADMIN,
    pathMatch: 'full',
    loadComponent() {
      return import("./admin/admin.component").then((m) => m.AdminComponent)
    },
  },
  {
    path: URLS.PASSWORD_FORGET,
    loadComponent() {
      return import("./admin/auth/forget-password/forget-password.component").then((m) => m.ForgetPasswordComponent)
    },
  },
  {
    path: URLS.PASSWORD_RESET,
    loadComponent() {
      return import("./admin/auth/reset-password/reset-password.component").then((m) => m.ResetPasswordComponent)
    },
  },
];
