import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const guardsGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.isAuthenticated()) {
    router.navigate(['/space-admin/login']);
    return false;
  };

  const requiredRole = route.data['role'] // todo: you should pass this daynamique
  const userRole: any = authService.getUserRole(); // todo: here shoudn't recive arry

  if (requiredRole && userRole?.[0]?.name !== requiredRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
