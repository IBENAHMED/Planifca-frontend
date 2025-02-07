import { Routes } from '@angular/router';
import { URLS } from '../components/helpers/url-constants';
import { guardsGuard } from '../auth/guards/guards.guard';
import { AdminClubsComponent } from '../admin/clubs/admin-clubs.component';

export const adminRoutes: Routes = [
  {
    path: URLS.ADMIN,
    canActivate: [guardsGuard],
    component: AdminClubsComponent,
    data: { role: 'admin' }
  },
];
