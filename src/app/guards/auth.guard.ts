import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();
  const tokenData = authService.getTokenData();
  const expiration = Number(tokenData?.['exp']);

  if (token && Number.isFinite(expiration) && expiration > Math.floor(Date.now() / 1000)) {
    return true;
  }

  authService.clearToken();
  return router.createUrlTree(['/login'], {
    queryParams: { sessionExpired: 'true' },
  });
};

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const hiddenForRoles = route.data['hiddenForRoles'] as string[] | undefined;

  if (!hiddenForRoles?.length) {
    return true;
  }

  const currentRole = authService.getRolToken()?.trim().toUpperCase();
  const isBlocked = currentRole
    ? hiddenForRoles.some(role => role.trim().toUpperCase() === currentRole)
    : true;

  return isBlocked ? router.createUrlTree(['/acceso-denegado']) : true;
};