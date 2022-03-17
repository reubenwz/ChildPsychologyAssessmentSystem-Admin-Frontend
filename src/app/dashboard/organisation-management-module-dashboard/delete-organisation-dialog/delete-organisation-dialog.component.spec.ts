import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteOrganisationDialogComponent } from './delete-organisation-dialog.component';

describe('DeleteOrganisationDialogComponent', () => {
  let component: DeleteOrganisationDialogComponent;
  let fixture: ComponentFixture<DeleteOrganisationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteOrganisationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteOrganisationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
