import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubQuestionDialogComponent } from './create-sub-question-dialog.component';

describe('CreateSubQuestionDialogComponent', () => {
  let component: CreateSubQuestionDialogComponent;
  let fixture: ComponentFixture<CreateSubQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubQuestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
