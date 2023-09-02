import { TestBed } from '@angular/core/testing';

import { ToggleDashboardService } from './toggle-dashboard.service';

describe('ToggleDashboardService', () => {
  let service: ToggleDashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToggleDashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
