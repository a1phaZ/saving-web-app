import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletAddComponent } from './wallet-add.component';
import { NgxsModule } from '@ngxs/store';
import { TelegramService } from '../../services/telegram.service';

describe('WalletAddComponent', () => {
  let component: WalletAddComponent;
  let fixture: ComponentFixture<WalletAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletAddComponent, NgxsModule.forRoot([])],
      providers: [
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

    fixture = TestBed.createComponent(WalletAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
