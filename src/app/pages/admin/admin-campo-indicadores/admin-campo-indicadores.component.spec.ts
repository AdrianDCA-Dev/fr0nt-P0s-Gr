import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCampoIndicadoresComponent } from './admin-campo-indicadores.component';

describe('AdminCampoIndicadoresComponent', () => {
  let component: AdminCampoIndicadoresComponent;
  let fixture: ComponentFixture<AdminCampoIndicadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCampoIndicadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCampoIndicadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
