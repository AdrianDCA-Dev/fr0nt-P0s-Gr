import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTypeAcademicProgramComponent } from './admin-type-academic-program.component';

describe('AdminTypeAcademicProgramComponent', () => {
  let component: AdminTypeAcademicProgramComponent;
  let fixture: ComponentFixture<AdminTypeAcademicProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminTypeAcademicProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTypeAcademicProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
