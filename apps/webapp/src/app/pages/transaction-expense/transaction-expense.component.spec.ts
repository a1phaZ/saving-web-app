import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionExpenseComponent } from './transaction-expense.component';
import { NgxsModule } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TelegramService } from '../../services/telegram.service';
import { WalletState } from '../../store/wallet/wallet.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(localeRu, 'ru-RU', localeRuExtra);

describe('TransactionExpenseComponent', () => {
  let component: TransactionExpenseComponent;
  let fixture: ComponentFixture<TransactionExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionExpenseComponent,
        NgxsModule.forRoot([WalletState]),
        HttpClientTestingModule,
      ],
      providers: [
        { provide: LOCALE_ID, useValue: 'ru-RU' },
        {
          provide: ActivatedRoute,
          useValue: { params: of(null), queryParams: of(null) },
        },
        {
          provide: TelegramService,
          useValue: {
            ready: () => {},
            BackButton: {
              show: () => {},
              hide: () => {},
              onClick: () => {},
              offClick: () => {},
            },
            MainButton: {
              show: () => {},
              hide: () => {},
              onClick: () => {},
              offClick: () => {},
              setText: () => {},
            },
            hideBackButton: () => {},
            hideMainButton: () => {},
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
