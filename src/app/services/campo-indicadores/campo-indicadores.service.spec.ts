import { TestBed, inject } from '@angular/core/testing';

import { CampoIndicadoresService } from './campo-indicadores.service';

describe('CampoIndicadoresService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CampoIndicadoresService]
    });
  });

  it('should be created', inject([CampoIndicadoresService], (service: CampoIndicadoresService) => {
    expect(service).toBeTruthy();
  }));
});
