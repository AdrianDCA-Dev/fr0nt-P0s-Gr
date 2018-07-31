import { TestBed, inject } from '@angular/core/testing';

import { EvaluationDocenteService } from './evaluation-docente.service';

describe('EvaluationDocenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluationDocenteService]
    });
  });

  it('should be created', inject([EvaluationDocenteService], (service: EvaluationDocenteService) => {
    expect(service).toBeTruthy();
  }));
});
