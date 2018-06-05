import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminInscriptionComponent } from './admin-inscription.component';

describe('AdminInscriptionComponent', () => {
  let component: AdminInscriptionComponent;
  let fixture: ComponentFixture<AdminInscriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminInscriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminInscriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
