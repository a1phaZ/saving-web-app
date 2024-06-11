import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegmentButtonComponent } from './segment-button.component';

describe('SegmentButtonComponent', () => {
  let component: SegmentButtonComponent;
  let fixture: ComponentFixture<SegmentButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegmentButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SegmentButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
