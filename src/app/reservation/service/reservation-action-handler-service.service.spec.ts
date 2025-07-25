import { TestBed } from '@angular/core/testing';

import { ReservationActionHandlerServiceService } from './reservation-action-handler.service';

describe('ReservationActionHandlerServiceService', () => {
  let service: ReservationActionHandlerServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReservationActionHandlerServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
