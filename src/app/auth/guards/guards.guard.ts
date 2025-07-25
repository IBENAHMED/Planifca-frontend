import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { UserContextService } from '../../components/services/user-context.service';

export const guardsGuard: CanActivateFn = async (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const userContextService = inject(UserContextService);
  const url = state.url;


  const segments = url.split('/');
  const currentFrontPath = segments.length > 1 ? segments[1] : null;

  if (!authService.isAuthenticated()) {
    if (currentFrontPath) {
      router.navigate([`/${currentFrontPath}/login`]);
    } else {
      router.navigate(['/unauthorized']);
    }
    return false;
  }

  const hasRole = await authService.hasRole(route.data['role']);
  if (!hasRole) {
    router.navigate(['/unauthorized']);
    return false;
  }

  return true;
};
