import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaregiverAssessmentResultComponent } from './caregiver-assessment-result.component';

describe('CaregiverAssessmentResultComponent', () => {
  let component: CaregiverAssessmentResultComponent;
  let fixture: ComponentFixture<CaregiverAssessmentResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaregiverAssessmentResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaregiverAssessmentResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
