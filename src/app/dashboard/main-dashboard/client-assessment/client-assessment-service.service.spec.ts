import { TestBed } from '@angular/core/testing';

import { ClientAssessmentServiceService } from './client-assessment-service.service';

describe('ClientAssessmentServiceService', () => {
  let service: ClientAssessmentServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientAssessmentServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
