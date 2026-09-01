import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth/auth-service';

const PUBLIC_URLS = [
  '/auth/login',
  '/auth/email_validar/',
];

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const token = authService.getToken();

  const isPublicUrl = PUBLIC_URLS.some(url =>
    req.url.includes(url)
  );

  if (!token || isPublicUrl) {
    return next(req);
  }

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};