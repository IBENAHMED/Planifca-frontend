import { Routes } from '@angular/router';
import { URLS } from './components/helpers/url-constants';

export const routes: Routes = [
  {
    path: URLS.ADMIN,
    pathMatch: 'full',
    loadComponent() {
      return import("./admin/admin.component").then((m) => m.AdminComponent)
    },
  },
  {
    path: URLS.PASSWORD_RESET,
    loadComponent() {
      return import("./admin/forget-password/forget-password.component").then((m) => m.ForgetPasswordComponent)
    },
  }
];
