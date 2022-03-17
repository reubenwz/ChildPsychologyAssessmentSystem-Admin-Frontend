import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardSelectionTopneedsComponent } from './dashboard-selection-topneeds.component';

describe('DashboardSelectionTopneedsComponent', () => {
  let component: DashboardSelectionTopneedsComponent;
  let fixture: ComponentFixture<DashboardSelectionTopneedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSelectionTopneedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSelectionTopneedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
