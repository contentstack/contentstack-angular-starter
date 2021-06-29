import { ModuleWithProviders, NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentstackService } from './contentstack.service';
import { Config } from './config';
export const CsbaseAppConfigToken = new InjectionToken<string>('CsbaseAppConfigToken');

export function _csbaseAppFactory(config) {
  try {
      return new ContentstackService(config);
  } catch (e) {
    return new ContentstackService(null);
  }
}

const ContentstackAppProvider = {
  provide: ContentstackService,
  useFactory:  _csbaseAppFactory,
  deps: [ CsbaseAppConfigToken ]
};

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ContentstackAppProvider]
})
export class ContentstackModule {

  static initializeApp(config: Config): ModuleWithProviders<any> {
    return {
      ngModule: ContentstackModule,
      providers: [
        {provide: CsbaseAppConfigToken, useValue: config }
      ]
    };
  }

}
