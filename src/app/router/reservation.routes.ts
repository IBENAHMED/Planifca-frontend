import { Routes } from '@angular/router';
import constants from '../components/constants';
import { guardsGuard } from '../auth/guards/guards.guard';
import { URLS } from '../components/helpers/url-constants';
import { ReservationComponent } from '../reservation/reservation/reservation.component';

export const reservationRoutes: Routes = [
  {
    path: URLS.RESERVATION,
    canActivate: [guardsGuard],
    component: ReservationComponent,
    data: { role: [constants.USER.SUPERADMIN, constants.USER.ADMIN] },
  },
];
