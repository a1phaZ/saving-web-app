import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionIncomeComponent } from './transaction-income.component';

describe('TransactionIncomeComponent', () => {
  let component: TransactionIncomeComponent;
  let fixture: ComponentFixture<TransactionIncomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionIncomeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionIncomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
