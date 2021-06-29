import { Injectable } from '@angular/core';
import * as contentstack from 'contentstack';
import { Config } from './config';


@Injectable()
export class ContentstackService {
  Stack: any = {};
  stackConfig: any = {};
  constructor(private config: Config) {
    this.stackConfig = config;
    this.Stack = contentstack.Stack(config);
  }

  public stack() {
    return contentstack.Stack(this.stackConfig);
  }
}
