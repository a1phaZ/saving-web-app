import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionExpenseComponent } from './transaction-expense.component';

describe('TransactionExpenseComponent', () => {
  let component: TransactionExpenseComponent;
  let fixture: ComponentFixture<TransactionExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionExpenseComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
