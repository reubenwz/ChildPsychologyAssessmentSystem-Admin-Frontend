import { TestBed } from '@angular/core/testing';

import { LocdistributionBarchartService } from './locdistribution-barchart.service';

describe('LocdistributionBarchartService', () => {
  let service: LocdistributionBarchartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocdistributionBarchartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
