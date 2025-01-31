import { TestBed } from '@angular/core/testing';

import { SnackBarServiceService } from './snack-bar-service.service';

describe('SnackBarServiceService', () => {
  let service: SnackBarServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SnackBarServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
