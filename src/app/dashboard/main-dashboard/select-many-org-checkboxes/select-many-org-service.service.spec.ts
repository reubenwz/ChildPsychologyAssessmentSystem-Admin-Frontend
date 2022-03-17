import { TestBed } from '@angular/core/testing';

import { SelectManyOrgServiceService } from './select-many-org-service.service';

describe('SelectManyOrgServiceService', () => {
  let service: SelectManyOrgServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SelectManyOrgServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
