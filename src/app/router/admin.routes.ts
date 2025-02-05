import { Routes } from '@angular/router';
import { URLS } from '../components/helpers/url-constants';

export const adminRoutes: Routes = [
  {
    path: URLS.ADMIN,
    loadComponent() {
      return import("../admin/clubs/admin-clubs.component").then((m) => m.AdminClubsComponent)
    },
  },
  {
    path: URLS.ADMIN_CLUB,
    loadComponent() {
      return import("../admin/clubs/admin-clubs.component").then((m) => m.AdminClubsComponent)
    },
  },
];
