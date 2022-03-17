import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubQuestionDialogComponent } from './view-sub-question-dialog.component';

describe('ViewSubQuestionDialogComponent', () => {
  let component: ViewSubQuestionDialogComponent;
  let fixture: ComponentFixture<ViewSubQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubQuestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
