import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAgeGroupDialogComponent } from './view-age-group-dialog.component';

describe('ViewAgeGroupDialogComponent', () => {
  let component: ViewAgeGroupDialogComponent;
  let fixture: ComponentFixture<ViewAgeGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewAgeGroupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewAgeGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
