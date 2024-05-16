import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectFieldValuesListComponent } from './select-field-values-list.component';

describe('SelectFieldValuesListComponent', () => {
  let component: SelectFieldValuesListComponent;
  let fixture: ComponentFixture<SelectFieldValuesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectFieldValuesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectFieldValuesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
