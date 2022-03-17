import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAssessmentComponent } from './client-assessment.component';

describe('ClientAssessmentComponent', () => {
  let component: ClientAssessmentComponent;
  let fixture: ComponentFixture<ClientAssessmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAssessmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
