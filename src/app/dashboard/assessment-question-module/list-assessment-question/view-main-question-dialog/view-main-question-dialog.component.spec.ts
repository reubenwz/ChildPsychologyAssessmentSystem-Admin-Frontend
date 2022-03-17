import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMainQuestionDialogComponent } from './view-main-question-dialog.component';

describe('ViewMainQuestionDialogComponent', () => {
  let component: ViewMainQuestionDialogComponent;
  let fixture: ComponentFixture<ViewMainQuestionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMainQuestionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMainQuestionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
