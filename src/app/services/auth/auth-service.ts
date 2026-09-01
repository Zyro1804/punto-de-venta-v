import { Service } from '@angular/core';

@Service()
export class AuthService {
  private readonly tokenKey = 'access_token';

  saveToken(token: string): void {
    if (!token) return;
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
