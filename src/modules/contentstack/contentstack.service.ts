import { Injectable } from '@angular/core';
import * as contentstack from 'contentstack';
import { Config } from './config';
import ContentstackLivePreview from '@contentstack/live-preview-utils';
import { customHostUrl, isValidCustomHostUrl } from "./utils";

@Injectable()
export class ContentstackService {
  Stack: any = {};
  stackConfig: any = {};
  customHostUrl: string="";
  constructor(private config: Config) {
    this.stackConfig = {
      api_key: config.api_key,
      delivery_token: config.delivery_token,
      environment: config.environment,
      branch: config.branch,
      region: config.region,
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
    };
    this.customHostUrl = customHostUrl(config.api_host);
    this.Stack = contentstack.Stack(this.stackConfig);
    if (isValidCustomHostUrl(this.customHostUrl)) {
      this.Stack.setHost(this.customHostUrl);
    }
    ContentstackLivePreview.init({
      enable: config.live_preview === "true",
      ssr: false,
      stackSdk: this.Stack,
      stackDetails: {
        apiKey: config.api_key,
      },
    });
  }

  public stack() {
    return {
      contentstack: this.Stack,
      livePreview: ContentstackLivePreview.onEntryChange,
    };
  }
}
