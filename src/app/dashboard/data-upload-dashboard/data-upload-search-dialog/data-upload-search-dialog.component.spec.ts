import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUploadSearchDialogComponent } from './data-upload-search-dialog.component';

describe('DataUploadSearchDialogComponent', () => {
  let component: DataUploadSearchDialogComponent;
  let fixture: ComponentFixture<DataUploadSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataUploadSearchDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUploadSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
