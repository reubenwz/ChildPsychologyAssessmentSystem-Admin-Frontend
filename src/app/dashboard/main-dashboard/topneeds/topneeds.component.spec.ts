import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopneedsComponent } from './topneeds.component';

describe('TopneedsComponent', () => {
  let component: TopneedsComponent;
  let fixture: ComponentFixture<TopneedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopneedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopneedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
