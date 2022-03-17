import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSubModuleDialogComponent } from './create-sub-module-dialog.component';

describe('CreateSubModuleDialogComponent', () => {
  let component: CreateSubModuleDialogComponent;
  let fixture: ComponentFixture<CreateSubModuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateSubModuleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSubModuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
