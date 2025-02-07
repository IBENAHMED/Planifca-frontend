import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const guardsGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/space-admin/login']);
    return false;
  };

  const requiredRole = 'admin'; // todo: you should pass this daynamique
  const userRole: any = authService.getUserRole(); // todo: here shoudn't recive arry

  if (requiredRole && userRole?.[0]?.name !== requiredRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
