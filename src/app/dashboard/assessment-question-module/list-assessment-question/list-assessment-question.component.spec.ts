import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssessmentQuestionComponent } from './list-assessment-question.component';

describe('ListAssessmentQuestionComponent', () => {
  let component: ListAssessmentQuestionComponent;
  let fixture: ComponentFixture<ListAssessmentQuestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssessmentQuestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssessmentQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
