import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideOptimus } from '@openng/optimus-ui/config';
import Aura from '@openng/optimus-ui-themes/aura';
import { MessageService } from '@openng/optimus-ui/api';
import { authInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth/auth-service';

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    AuthService,
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideOptimus({ 
      theme: { 
        preset: Aura,
        options : {
          
        }
       }
    }),
  ],
};
