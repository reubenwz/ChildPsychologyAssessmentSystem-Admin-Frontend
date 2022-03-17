import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataUploadDashboardComponent } from './data-upload-dashboard.component';

describe('DataUploadDashboardComponent', () => {
  let component: DataUploadDashboardComponent;
  let fixture: ComponentFixture<DataUploadDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataUploadDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataUploadDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
