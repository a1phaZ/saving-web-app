import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionIncomeComponent } from './transaction-income.component';
import { NgxsModule } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import localeRu from '@angular/common/locales/ru';
import localeRuExtra from '@angular/common/locales/extra/ru';
import { registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
registerLocaleData(localeRu, 'ru-RU', localeRuExtra);

describe('TransactionIncomeComponent', () => {
  let component: TransactionIncomeComponent;
  let fixture: ComponentFixture<TransactionIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TransactionIncomeComponent,
        NgxsModule.forRoot([]),
        HttpClientTestingModule,
      ],
      providers: [
        { provide: LOCALE_ID, useValue: 'ru-RU' },
        {
          provide: ActivatedRoute,
          useValue: { params: of(null), queryParams: of(null) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
