import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocdistributionBarchartComponent } from './locdistribution-barchart.component';

describe('LocdistributionBarchartComponent', () => {
  let component: LocdistributionBarchartComponent;
  let fixture: ComponentFixture<LocdistributionBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocdistributionBarchartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocdistributionBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
