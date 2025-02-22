import { Routes } from '@angular/router';
import constants from '../components/constants';
import { guardsGuard } from '../auth/guards/guards.guard';
import { URLS } from '../components/helpers/url-constants';
import { AdministrationComponent } from '../club/administration/administration.component';

export const clubRoutes: Routes = [
  {
    path: URLS.CLUB,
    canActivate: [guardsGuard],
    component: AdministrationComponent,
    data: { role: [constants.USER.SUPERADMIN, constants.USER.ADMIN] },
  },
];
