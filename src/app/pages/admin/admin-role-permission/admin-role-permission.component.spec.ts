import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRolePermissionComponent } from './admin-role-permission.component';

describe('AdminRolePermissionComponent', () => {
  let component: AdminRolePermissionComponent;
  let fixture: ComponentFixture<AdminRolePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminRolePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRolePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
