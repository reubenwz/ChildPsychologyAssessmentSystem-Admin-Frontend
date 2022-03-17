import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAssessmentsComponent } from './list-assessments.component';

describe('ListAssessmentsComponent', () => {
  let component: ListAssessmentsComponent;
  let fixture: ComponentFixture<ListAssessmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListAssessmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
