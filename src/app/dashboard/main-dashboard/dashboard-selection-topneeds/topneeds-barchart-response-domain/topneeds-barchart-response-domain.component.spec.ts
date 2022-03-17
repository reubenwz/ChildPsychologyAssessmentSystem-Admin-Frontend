import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopneedsBarchartResponseDomainComponent } from './topneeds-barchart-response-domain.component';

describe('TopneedsBarchartResponseDomainComponent', () => {
  let component: TopneedsBarchartResponseDomainComponent;
  let fixture: ComponentFixture<TopneedsBarchartResponseDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TopneedsBarchartResponseDomainComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopneedsBarchartResponseDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
