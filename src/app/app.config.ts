import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { IntegrationsService } from '../services/integrations/integrations.service';
import { ToastrModule, ToastrService, provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    IntegrationsService,
    provideToastr({
      timeOut: 7000,
    }),
    provideAnimations(),
  ],
};
