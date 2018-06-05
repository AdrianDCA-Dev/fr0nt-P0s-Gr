import { TestBed, inject } from '@angular/core/testing';

import { AcademicProgramService } from './academic-program.service';

describe('AcademicProgramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AcademicProgramService]
    });
  });

  it('should be created', inject([AcademicProgramService], (service: AcademicProgramService) => {
    expect(service).toBeTruthy();
  }));
});
