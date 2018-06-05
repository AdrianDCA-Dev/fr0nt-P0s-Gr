import { TestBed, inject } from '@angular/core/testing';

import { ChronogramDetailService } from './chronogram-detail.service';

describe('ChronogramDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChronogramDetailService]
    });
  });

  it('should be created', inject([ChronogramDetailService], (service: ChronogramDetailService) => {
    expect(service).toBeTruthy();
  }));
});
