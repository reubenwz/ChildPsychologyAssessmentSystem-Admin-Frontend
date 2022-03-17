import { TestBed } from '@angular/core/testing';

import { AssessmentQuestionService } from './assessment-question.service';

describe('AssessmentQuestionService', () => {
  let service: AssessmentQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssessmentQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
