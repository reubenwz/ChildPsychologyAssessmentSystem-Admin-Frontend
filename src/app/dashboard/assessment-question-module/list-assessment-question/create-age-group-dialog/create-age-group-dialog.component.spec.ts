import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAgeGroupDialogComponent } from './create-age-group-dialog.component';

describe('CreateAgeGroupDialogComponent', () => {
  let component: CreateAgeGroupDialogComponent;
  let fixture: ComponentFixture<CreateAgeGroupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAgeGroupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAgeGroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
