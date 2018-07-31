import { TestBed, inject } from '@angular/core/testing';

import { EvaluationAdminDocenteService } from './evaluation-admin-docente.service';

describe('EvaluationAdminDocenteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvaluationAdminDocenteService]
    });
  });

  it('should be created', inject([EvaluationAdminDocenteService], (service: EvaluationAdminDocenteService) => {
    expect(service).toBeTruthy();
  }));
});
