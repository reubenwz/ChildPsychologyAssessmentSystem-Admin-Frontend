import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrganisationDialogComponent } from './create-organisation-dialog.component';

describe('CreateOrganisationDialogComponent', () => {
  let component: CreateOrganisationDialogComponent;
  let fixture: ComponentFixture<CreateOrganisationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrganisationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateOrganisationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
