import { Routes } from '@angular/router';
import { authRoutes } from './router/auth.routes';
import { adminRoutes } from './router/admin.routes';
import { notfoundRoutes } from './router/not-found.routes';

export const routes: Routes = [
  ...adminRoutes,
  ...authRoutes,
  ...notfoundRoutes,
];
