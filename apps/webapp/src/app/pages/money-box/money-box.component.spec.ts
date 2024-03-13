import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneyBoxComponent } from './money-box.component';

describe('MoneyBoxComponent', () => {
  let component: MoneyBoxComponent;
  let fixture: ComponentFixture<MoneyBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoneyBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MoneyBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
