import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarBlockComponent } from './sidebar-block.component';

describe('SidebarBlockComponent', () => {
  let component: SidebarBlockComponent;
  let fixture: ComponentFixture<SidebarBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarBlockComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
