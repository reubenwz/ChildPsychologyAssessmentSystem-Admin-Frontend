import { TestBed } from '@angular/core/testing';

import { TraumapercentageServiceService } from './traumapercentage-service.service';

describe('TraumapercentageServiceService', () => {
  let service: TraumapercentageServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TraumapercentageServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
