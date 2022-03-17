import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAssessmentDetailsComponent } from './update-assessment-details.component';

describe('UpdateAssessmentDetailsComponent', () => {
  let component: UpdateAssessmentDetailsComponent;
  let fixture: ComponentFixture<UpdateAssessmentDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateAssessmentDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateAssessmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
