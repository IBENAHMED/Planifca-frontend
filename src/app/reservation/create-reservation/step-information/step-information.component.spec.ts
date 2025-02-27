import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepInformationComponent } from './step-information.component';

describe('StepInformationComponent', () => {
  let component: StepInformationComponent;
  let fixture: ComponentFixture<StepInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StepInformationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StepInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
