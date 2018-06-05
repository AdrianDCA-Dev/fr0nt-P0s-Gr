import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAcademicProgramComponent } from './admin-academic-program.component';

describe('AdminAcademicProgramComponent', () => {
  let component: AdminAcademicProgramComponent;
  let fixture: ComponentFixture<AdminAcademicProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAcademicProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAcademicProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
