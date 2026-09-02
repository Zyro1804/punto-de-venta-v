import { Service } from '@angular/core';

@Service()
export class AuthService {
  private readonly tokenKey = 'access_token';
  private readonly tokenDataKey = 'access_token_data';

  saveToken(token: string): void {
    if (!token) return;
    localStorage.setItem(this.tokenKey, token);

    const tokenData = this.decodeToken(token);
    if (tokenData) {
      localStorage.setItem(this.tokenDataKey, JSON.stringify(tokenData));
    } else {
      localStorage.removeItem(this.tokenDataKey);
    }
  }

  decodeToken(token: string): Record<string, unknown> | null {
    try {
      const payload = token.split('.')[1];
      if (!payload) return null;

      const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
      const decodedPayload = atob(base64.padEnd(Math.ceil(base64.length / 4) * 4, '='));
      return JSON.parse(decodedPayload) as Record<string, unknown>;
    } catch {
      return null;
    }
  }

  getTokenData(): Record<string, unknown> | null {
    try {
      const tokenData = localStorage.getItem(this.tokenDataKey);
      return tokenData ? JSON.parse(tokenData) as Record<string, unknown> : null;
    } catch {
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.tokenDataKey);
  }
}
