import { TestBed, inject } from '@angular/core/testing';

import { PlanClaseService } from './plan-clase.service';

describe('PlanClaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlanClaseService]
    });
  });

  it('should be created', inject([PlanClaseService], (service: PlanClaseService) => {
    expect(service).toBeTruthy();
  }));
});
