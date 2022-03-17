import { TestBed } from '@angular/core/testing';

import { TypesOrgsDistServiceService } from './types-orgs-dist-service.service';

describe('TypesOrgsDistServiceService', () => {
  let service: TypesOrgsDistServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypesOrgsDistServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
