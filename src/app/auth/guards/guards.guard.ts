import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { CanActivateFn, Router } from '@angular/router';
import { UserContextService } from '../../components/services/user-context.service';

export const guardsGuard: CanActivateFn = async (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const userContextService = inject(UserContextService);

  if (!authService.isAuthenticated()) {
    if (userContextService.getUserContext()) {
      router.navigate([`/${(userContextService.getUserContext())?.frontPath}/login`]);
      return false;
    };
    router.navigate(['/unauthorized']);
    return false;
  };

  if (!await authService.hasRole(route.data['role'])) {
    router.navigate(['/unauthorized']);
  };

  return true;
};
