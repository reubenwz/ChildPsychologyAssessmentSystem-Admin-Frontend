import { TestBed } from '@angular/core/testing';

import { DashboardPdfService } from './dashboard-pdf.service';

describe('DashboardPdfService', () => {
  let service: DashboardPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
