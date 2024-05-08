import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchFieldComponent } from './switch-field.component';

describe('SwitchFieldComponent', () => {
  let component: SwitchFieldComponent;
  let fixture: ComponentFixture<SwitchFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SwitchFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
