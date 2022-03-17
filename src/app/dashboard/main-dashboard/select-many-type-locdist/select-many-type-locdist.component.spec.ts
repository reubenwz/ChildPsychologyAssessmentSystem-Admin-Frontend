import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectManyTypeLocdistComponent } from './select-many-type-locdist.component';

describe('SelectManyTypeLocdistComponent', () => {
  let component: SelectManyTypeLocdistComponent;
  let fixture: ComponentFixture<SelectManyTypeLocdistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectManyTypeLocdistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectManyTypeLocdistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
