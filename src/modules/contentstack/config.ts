import { Injectable } from '@angular/core';

@Injectable()
export class Config {
  api_key: string;
  delivery_token: string;
  environment: string;
  branch: string;
  region: string;
  api_host: string;
  app_host: string;
  preview_token: string;
  preview_host: string;
  live_preview: string | boolean;
}
