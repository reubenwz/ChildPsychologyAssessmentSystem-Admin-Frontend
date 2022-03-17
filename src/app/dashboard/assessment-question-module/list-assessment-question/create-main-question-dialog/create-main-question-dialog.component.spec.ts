import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMainQuestionDialogComponent } from './create-main-question-dialog.component';

describe('CreateMainQuestionDialogComponent', () => {
  let component: CreateMainQuestionDialogComponent;
  let fixture: ComponentFixture<CreateMainQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateMainQuestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMainQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
