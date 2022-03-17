import { TestBed } from '@angular/core/testing';

import { ViewSpecificAssessmentService } from './view-specific-assessment.service';

describe('ViewSpecificAssessmentService', () => {
  let service: ViewSpecificAssessmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewSpecificAssessmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
