import { TestBed, inject } from '@angular/core/testing';

import { CronogramaService } from './cronograma.service';

describe('CronogramaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CronogramaService]
    });
  });

  it('should be created', inject([CronogramaService], (service: CronogramaService) => {
    expect(service).toBeTruthy();
  }));
});
