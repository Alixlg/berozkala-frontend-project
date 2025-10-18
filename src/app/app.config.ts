import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { mainInterceptor } from './+interceptos/main.interceptor';
import { alertInterceptor } from './+interceptos/alert.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
  provideRouter(routes),
  provideHttpClient(
    withInterceptors([mainInterceptor, alertInterceptor])
  )]
};
