import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEvaluationCriteriaComponent } from './admin-evaluation-criteria.component';

describe('AdminEvaluationCriteriaComponent', () => {
  let component: AdminEvaluationCriteriaComponent;
  let fixture: ComponentFixture<AdminEvaluationCriteriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminEvaluationCriteriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEvaluationCriteriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
