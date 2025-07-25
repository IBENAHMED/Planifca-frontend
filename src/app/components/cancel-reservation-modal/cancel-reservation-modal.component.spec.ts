import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelReservationModalComponent } from './cancel-reservation-modal.component';

describe('CancelReservationModalComponent', () => {
  let component: CancelReservationModalComponent;
  let fixture: ComponentFixture<CancelReservationModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelReservationModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelReservationModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
