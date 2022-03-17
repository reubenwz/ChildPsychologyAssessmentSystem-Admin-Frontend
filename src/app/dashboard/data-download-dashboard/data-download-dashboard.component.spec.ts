import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDownloadDashboardComponent } from './data-download-dashboard.component';

describe('DataDownloadDashboardComponent', () => {
  let component: DataDownloadDashboardComponent;
  let fixture: ComponentFixture<DataDownloadDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DataDownloadDashboardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataDownloadDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
