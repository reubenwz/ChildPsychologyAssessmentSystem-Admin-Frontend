import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificAssessmentComponent } from './view-specific-assessment.component';

describe('ViewSpecificAssessmentComponent', () => {
  let component: ViewSpecificAssessmentComponent;
  let fixture: ComponentFixture<ViewSpecificAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpecificAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecificAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
