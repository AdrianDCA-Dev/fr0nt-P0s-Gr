import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdminTeacherComponent } from './admin-admin-teacher.component';

describe('AdminAdminTeacherComponent', () => {
  let component: AdminAdminTeacherComponent;
  let fixture: ComponentFixture<AdminAdminTeacherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAdminTeacherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAdminTeacherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
