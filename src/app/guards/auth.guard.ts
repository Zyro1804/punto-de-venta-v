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