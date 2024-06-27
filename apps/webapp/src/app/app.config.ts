import {
  ApplicationConfig,
  importProvidersFrom,
  isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { translocoConf, TranslocoHttpLoader } from './transloco-loader';
import { provideTransloco } from '@ngneat/transloco';
import { NgxsModule } from '@ngxs/store';
import { AppState } from './store/app/app.state';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
import { WalletState } from './store/wallet/wallet.state';
import { TransactionState } from './store/transaction/transaction.state';
import { provideAnimations } from '@angular/platform-browser/animations';
import { BillState } from './store/bill/bill.state';
import { BillService } from './services/bill.service';
import { MockBillService } from './services/mock-bill.service';

registerLocaleData(localeRu, 'ru-RU', localeRuExtra);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideHttpClient(),
    provideTransloco({
      config: translocoConf,
      loader: TranslocoHttpLoader,
    }),
    importProvidersFrom(
      NgxsModule.forRoot([AppState, WalletState, TransactionState, BillState], {
        developmentMode: isDevMode(),
      })
    ),
    importProvidersFrom(NgxsLoggerPluginModule.forRoot()),
    provideAnimations(),
    {
      provide: BillService,
      useClass: MockBillService,
    },
  ],
};
