import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterTestingModule } from '@angular/router/testing';
import { provideTransloco } from '@ngneat/transloco';
import {
  translocoConf,
  TranslocoHttpLoader,
  TranslocoRootModule,
} from './transloco-loader';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgxsModule } from '@ngxs/store';
import { TelegramService } from './services/telegram.service';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        NxWelcomeComponent,
        RouterTestingModule,
        HttpClientTestingModule,
        TranslocoRootModule,
        NgxsModule.forRoot([]),
      ],
      providers: [
        provideTransloco({
          config: translocoConf,
          loader: TranslocoHttpLoader,
        }),
        {
          provide: TelegramService,
          useValue: {
            ready: () => {},
          },
        },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
