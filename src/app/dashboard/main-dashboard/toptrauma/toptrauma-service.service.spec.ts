import { TestBed } from '@angular/core/testing';

import { ToptraumaServiceService } from './toptrauma-service.service';

describe('ToptraumaServiceService', () => {
  let service: ToptraumaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToptraumaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
