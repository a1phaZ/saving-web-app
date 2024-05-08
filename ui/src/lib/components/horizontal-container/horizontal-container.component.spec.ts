import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HorizontalContainerComponent } from './horizontal-container.component';

describe('HorizontalContainerComponent', () => {
  let component: HorizontalContainerComponent;
  let fixture: ComponentFixture<HorizontalContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HorizontalContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
