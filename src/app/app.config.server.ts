import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';
import {  provideHttpClient } from '@angular/common/http';

const serverConfig: ApplicationConfig = {
  providers: [
     provideHttpClient(),
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
