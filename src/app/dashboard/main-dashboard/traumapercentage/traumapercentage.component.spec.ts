import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraumapercentageComponent } from './traumapercentage.component';

describe('TraumapercentageComponent', () => {
  let component: TraumapercentageComponent;
  let fixture: ComponentFixture<TraumapercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TraumapercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TraumapercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
