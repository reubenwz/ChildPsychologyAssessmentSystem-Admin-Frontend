import { TestBed } from '@angular/core/testing';

import { TopneedsServiceService } from './topneeds-service.service';

describe('TopneedsServiceService', () => {
  let service: TopneedsServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopneedsServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
