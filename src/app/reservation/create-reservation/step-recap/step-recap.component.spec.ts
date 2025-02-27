import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepRecapComponent } from './step-recap.component';

describe('StepRecapComponent', () => {
  let component: StepRecapComponent;
  let fixture: ComponentFixture<StepRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepRecapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
