import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepCanladerComponent } from './step-canlader.component';

describe('StepCanladerComponent', () => {
  let component: StepCanladerComponent;
  let fixture: ComponentFixture<StepCanladerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepCanladerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepCanladerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
