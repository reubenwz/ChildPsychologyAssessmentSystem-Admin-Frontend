import { TestBed } from '@angular/core/testing';

import { AssessmentTrackingService } from './assessment-tracking.service';

describe('AssessmentTrackingService', () => {
  let service: AssessmentTrackingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentTrackingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
