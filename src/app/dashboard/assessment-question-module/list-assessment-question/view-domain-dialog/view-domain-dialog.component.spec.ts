import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDomainDialogComponent } from './view-domain-dialog.component';

describe('ViewDomainDialogComponent', () => {
  let component: ViewDomainDialogComponent;
  let fixture: ComponentFixture<ViewDomainDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDomainDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDomainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
