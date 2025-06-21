import { Routes } from '@angular/router';
import constants from '../components/constants';
import { guardsGuard } from '../auth/guards/guards.guard';
import { URLS } from '../components/helpers/url-constants';
import { ProfileComponent } from '../admin/profile/profile.component';
import { AdminClubsComponent } from '../admin/clubs/admin-clubs.component';

export const adminRoutes: Routes = [
  {
    path: URLS.ADMIN,
    component: AdminClubsComponent,
  },
  {
    path: URLS.PROFILE,
    component: ProfileComponent,
  },
];
