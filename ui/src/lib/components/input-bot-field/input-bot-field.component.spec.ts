import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputBotFieldComponent } from './input-bot-field.component';

describe('InputFieldComponent', () => {
  let component: InputBotFieldComponent;
  let fixture: ComponentFixture<InputBotFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputBotFieldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputBotFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
