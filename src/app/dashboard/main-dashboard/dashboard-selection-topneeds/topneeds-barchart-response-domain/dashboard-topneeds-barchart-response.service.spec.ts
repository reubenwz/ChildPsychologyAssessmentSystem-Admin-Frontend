import { TestBed } from '@angular/core/testing';

import { DashboardTopneedsBarchartResponseService } from './dashboard-topneeds-barchart-response.service';

describe('DashboardTopneedsBarchartResponseService', () => {
  let service: DashboardTopneedsBarchartResponseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardTopneedsBarchartResponseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
