import { Routes } from '@angular/router';
import { guardsGuard } from '../auth/guards/guards.guard';
import { URLS } from '../components/helpers/url-constants';
import { ProfileComponent } from '../admin/profile/profile.component';
import { AdminClubsComponent } from '../admin/clubs/admin-clubs.component';

export const adminRoutes: Routes = [
  {
    path: URLS.ADMIN,
    canActivate: [guardsGuard],
    component: AdminClubsComponent,
    data: { role: 'admin' },
  },
  {
    path: URLS.PROFILE,
    canActivate: [guardsGuard],
    component: ProfileComponent,
    data: { role: 'admin' },
  },
];
