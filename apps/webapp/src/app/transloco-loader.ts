import { inject, Injectable, isDevMode, NgModule } from '@angular/core';
import {
  Translation,
  TRANSLOCO_CONFIG,
  TRANSLOCO_LOADER,
  TranslocoLoader,
  TranslocoModule,
} from '@ngneat/transloco';
import { HttpClient } from '@angular/common/http';

export const translocoConf = {
  availableLangs: ['en', 'ru'],
  defaultLang: 'en',
  // Remove this option if your application doesn't support changing language in runtime.
  reRenderOnLangChange: true,
  missingHandler: { allowEmpty: !isDevMode() },
  prodMode: !isDevMode(),
};

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  private http = inject(HttpClient);

  getTranslation(lang: string) {
    return this.http.get<Translation>(`./assets/i18n/${lang}.json`);
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConf,
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
