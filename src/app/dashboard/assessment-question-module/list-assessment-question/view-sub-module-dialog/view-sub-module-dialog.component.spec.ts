import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSubModuleDialogComponent } from './view-sub-module-dialog.component';

describe('ViewSubModuleDialogComponent', () => {
  let component: ViewSubModuleDialogComponent;
  let fixture: ComponentFixture<ViewSubModuleDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSubModuleDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSubModuleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
