import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToptraumaComponent } from './toptrauma.component';

describe('ToptraumaComponent', () => {
  let component: ToptraumaComponent;
  let fixture: ComponentFixture<ToptraumaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToptraumaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToptraumaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
