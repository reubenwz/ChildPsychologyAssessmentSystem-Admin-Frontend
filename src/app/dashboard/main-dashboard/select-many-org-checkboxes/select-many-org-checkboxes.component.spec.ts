import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectManyOrgCheckboxesComponent } from './select-many-org-checkboxes.component';

describe('SelectManyOrgCheckboxesComponent', () => {
  let component: SelectManyOrgCheckboxesComponent;
  let fixture: ComponentFixture<SelectManyOrgCheckboxesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectManyOrgCheckboxesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectManyOrgCheckboxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
