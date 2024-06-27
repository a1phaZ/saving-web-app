import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextFormFieldMobileComponent } from './text-form-field-mobile.component';

describe('InputFieldComponent', () => {
  let component: TextFormFieldMobileComponent;
  let fixture: ComponentFixture<TextFormFieldMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextFormFieldMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TextFormFieldMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
