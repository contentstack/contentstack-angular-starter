import { Injectable } from '@angular/core';

@Injectable()
export class Config {
    api_key: string;
    delivery_token: string;
    environment: string;
    api_host: string;
    app_host: string;
    management_token: string;
    live_preview: string | boolean;
  }
