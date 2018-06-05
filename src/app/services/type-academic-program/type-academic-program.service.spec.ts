import { TestBed, inject } from '@angular/core/testing';

import { TypeAcademicProgramService } from './type-academic-program.service';

describe('TypeAcademicProgramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TypeAcademicProgramService]
    });
  });

  it('should be created', inject([TypeAcademicProgramService], (service: TypeAcademicProgramService) => {
    expect(service).toBeTruthy();
  }));
});
