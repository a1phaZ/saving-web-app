import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WalletInfoComponent } from './wallet-info.component';
import { NgxsModule } from '@ngxs/store';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('WalletInfoComponent', () => {
  let component: WalletInfoComponent;
  let fixture: ComponentFixture<WalletInfoComponent>;
  let fakeActivatedRoute: any;

  beforeEach(async () => {
    fakeActivatedRoute = { params: of(null) };
    await TestBed.configureTestingModule({
      imports: [WalletInfoComponent, NgxsModule.forRoot([])],
      providers: [{ provide: ActivatedRoute, useValue: fakeActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(WalletInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
