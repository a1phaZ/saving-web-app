import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalendarFieldComponent } from './calendar-field.component';

describe('CalendarFieldComponent', () => {
  let component: CalendarFieldComponent;
  let fixture: ComponentFixture<CalendarFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
