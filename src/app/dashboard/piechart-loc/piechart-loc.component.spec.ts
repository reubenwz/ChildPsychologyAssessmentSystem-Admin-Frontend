import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PiechartLocComponent } from './piechart-loc.component';

describe('PiechartLocComponent', () => {
  let component: PiechartLocComponent;
  let fixture: ComponentFixture<PiechartLocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PiechartLocComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PiechartLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
