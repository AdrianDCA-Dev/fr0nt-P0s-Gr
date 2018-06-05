import { TestBed, inject } from '@angular/core/testing';

import { DetailEvaluationService } from './detail-evaluation.service';

describe('DetailEvaluationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailEvaluationService]
    });
  });

  it('should be created', inject([DetailEvaluationService], (service: DetailEvaluationService) => {
    expect(service).toBeTruthy();
  }));
});
