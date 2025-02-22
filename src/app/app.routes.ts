import { Routes } from '@angular/router';
import { clubRoutes } from './router/club.routes';
import { authRoutes } from './router/auth.routes';
import { adminRoutes } from './router/admin.routes';
import { notfoundRoutes } from './router/not-found.routes';
import { reservationRoutes } from './router/reservation.routes';

export const routes: Routes = [
  ...adminRoutes,
  ...authRoutes,
  ...clubRoutes,
  ...reservationRoutes,
  ...notfoundRoutes,
];
