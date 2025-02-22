import { inject } from '@angular/core';
import constants from '../../components/constants';
import { AuthService } from '../service/auth.service';
import { CanActivateFn, Router } from '@angular/router';

export const guardsGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const authService = inject(AuthService);
  const userContext = localStorage.getItem('userContext');

  if (!authService.isAuthenticated()) {
    if (userContext) {
      router.navigate([`/${JSON.parse(userContext).frontPath}/login`]);
      return false;
    };
    router.navigate(['/unauthorized']);
    return false;
  };

  if (route.data['role'] !== constants.USER.Admin) {
    router.navigate(['/unauthorized']);
  };

  return true;
};
