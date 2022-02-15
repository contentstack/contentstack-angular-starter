import { Injectable } from '@angular/core';
import * as contentstack from 'contentstack';
import { Config } from './config';
import ContentstackLivePreview from '@contentstack/live-preview-utils';

@Injectable()
export class ContentstackService {
  Stack: any = {};
  stackConfig: any = {};
  constructor(private config: Config) {
    this.stackConfig = {
      api_key: config.api_key,
      delivery_token: config.delivery_token,
      environment: config.environment,
      live_preview: {
        enable: config.live_preview,
        management_token: config.management_token,
        host: config.api_host,
        ssr: false,
      },
      stackDetails: {
        apiKey: config.api_key,
        environment: config.environment,
      },
    }

    this.Stack = contentstack.Stack(this.stackConfig);
    this.Stack.setHost(config.api_host);
    ContentstackLivePreview.init({
      enable: true,
      ssr: false,
      stackSdk: this.Stack,
      stackDetails: {
        apiKey: config.api_key,
      },
    });

  }

  public stack() {
    return { contentstack: this.Stack, livePreview: ContentstackLivePreview.onEntryChange };
  }
}
