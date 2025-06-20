import { TestBed } from '@angular/core/testing';

import { ResirvationServiceService } from './resirvation-service.service';

describe('ResirvationServiceService', () => {
  let service: ResirvationServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResirvationServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
