import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagementModuleComponent } from './admin-management-module.component';

describe('AdminManagementModuleComponent', () => {
  let component: AdminManagementModuleComponent;
  let fixture: ComponentFixture<AdminManagementModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminManagementModuleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminManagementModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
