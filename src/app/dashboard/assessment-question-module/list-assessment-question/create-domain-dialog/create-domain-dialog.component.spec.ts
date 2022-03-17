import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDomainDialogComponent } from './create-domain-dialog.component';

describe('CreateDomainDialogComponent', () => {
  let component: CreateDomainDialogComponent;
  let fixture: ComponentFixture<CreateDomainDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDomainDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDomainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
